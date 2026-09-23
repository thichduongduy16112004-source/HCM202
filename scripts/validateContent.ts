import fs from 'node:fs';
import path from 'node:path';
import { argumentsData } from '../src/data/arguments.ts';
import { debates } from '../src/data/debates.ts';
import { evidence } from '../src/data/evidence.ts';
import { guaranteeConditions } from '../src/data/conditions.ts';
import { historicalImages } from '../src/data/images.ts';
import { limitations } from '../src/data/limitations.ts';
import { presentationSections } from '../src/data/presentation.ts';
import { academicSources } from '../src/data/sources.ts';

const errors: string[] = [];

const reportMissing = (owner: string, relation: string, id: string) => {
  errors.push(`[${owner}] ${relation} không tồn tại: ${id}`);
};

const findDuplicates = (label: string, ids: string[]) => {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`[${label}] ID bị trùng: ${id}`);
    seen.add(id);
  }
};

const sourceIds = new Set(academicSources.map((source) => source.id));
const imageIds = new Set(historicalImages.map((image) => image.id));
const evidenceIds = new Set(evidence.map((item) => item.id));
const argumentIds = new Set(argumentsData.map((argument) => argument.id));

findDuplicates('Source', academicSources.map((source) => source.id));
findDuplicates('Image', historicalImages.map((image) => image.id));
findDuplicates('Evidence', evidence.map((item) => item.id));
findDuplicates('Argument', argumentsData.map((argument) => argument.id));
findDuplicates('Debate', debates.map((debate) => debate.id));
findDuplicates('Limitation', limitations.map((limitation) => limitation.id));
findDuplicates('PresentationSection', presentationSections.map((section) => section.id));
findDuplicates('GuaranteeCondition', guaranteeConditions.map((condition) => condition.id));

for (const item of evidence) {
  for (const sourceId of item.sourceIds) {
    if (!sourceIds.has(sourceId)) reportMissing(item.id, 'sourceId', sourceId);
  }
  for (const imageId of item.imageIds) {
    if (!imageIds.has(imageId)) reportMissing(item.id, 'imageId', imageId);
  }
  if (item.verificationStatus === 'verified' && item.sourceIds.length === 0) {
    errors.push(`[${item.id}] Evidence verified nhưng không có sourceId.`);
  }
  if (item.quote && item.sourceIds.length === 0) {
    errors.push(`[${item.id}] Quote không có sourceId.`);
  }
}

for (const image of historicalImages) {
  const relativePath = image.src.replace(/^\//, '');
  const absolutePath = path.join(process.cwd(), 'public', relativePath.replace(/^assets[\\/]history/, 'assets/history'));
  if (!fs.existsSync(absolutePath)) errors.push(`[${image.id}] Không tìm thấy ảnh: ${image.src}`);
  if (!image.sourceName || !image.sourceUrl) {
    errors.push(`[${image.id}] Ảnh công khai phải có tên và URL nguồn.`);
  }
  if (image.sourceUrl && !/^https:\/\//.test(image.sourceUrl)) {
    errors.push(`[${image.id}] URL nguồn ảnh không hợp lệ: ${image.sourceUrl}`);
  }
  for (const evidenceId of image.relatedEvidenceIds) {
    if (!evidenceIds.has(evidenceId)) reportMissing(image.id, 'relatedEvidenceId', evidenceId);
  }
}

for (const argument of argumentsData) {
  for (const evidenceId of argument.evidenceIds) {
    if (!evidenceIds.has(evidenceId)) reportMissing(argument.id, 'evidenceId', evidenceId);
  }
}

for (const debate of debates) {
  for (const evidenceId of debate.evidenceIds) {
    if (!evidenceIds.has(evidenceId)) reportMissing(debate.id, 'evidenceId', evidenceId);
  }
}

for (const limitation of limitations) {
  for (const evidenceId of limitation.evidenceIds) {
    if (!evidenceIds.has(evidenceId)) reportMissing(limitation.id, 'evidenceId', evidenceId);
  }
}

for (const condition of guaranteeConditions) {
  for (const evidenceId of condition.evidenceIds) {
    if (!evidenceIds.has(evidenceId)) reportMissing(condition.id, 'evidenceId', evidenceId);
  }
}

for (const section of presentationSections) {
  for (const argumentId of section.argumentIds) {
    if (!argumentIds.has(argumentId)) reportMissing(section.id, 'argumentId', argumentId);
  }
  for (const imageId of section.imageIds) {
    if (!imageIds.has(imageId)) reportMissing(section.id, 'imageId', imageId);
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed (${errors.length} lỗi):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Content validation passed.');
console.log(`Arguments: ${argumentsData.length}`);
console.log(`Evidence: ${evidence.length}`);
console.log(`Sources: ${academicSources.length}`);
console.log(`Images: ${historicalImages.length}`);
