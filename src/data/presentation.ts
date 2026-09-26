import type { PresentationSection } from '@/types';
import { argumentsData } from './arguments.ts';
import { historicalImages } from './images.ts';

const argumentIdsFor = (sectionId: string) => argumentsData
  .filter((argument) => argument.sectionId === sectionId)
  .map((argument) => argument.id);

export const presentationSections: PresentationSection[] = [
  {
    id: 'hero',
    slug: 'hero',
    order: 1,
    title: 'Độc lập dân tộc và chủ nghĩa xã hội',
    subtitle: 'Mục tiêu – Con đường trong tư tưởng Hồ Chí Minh',
    argumentIds: [],
    imageIds: ['image-bac-doc-tuyen-ngon-1945'],
    presentationDuration: 20,
  },
  {
    id: 'independence',
    slug: 'independence',
    order: 2,
    title: 'Độc lập dân tộc',
    subtitle: 'Bốn nội dung cốt lõi',
    argumentIds: argumentIdsFor('independence'),
    imageIds: historicalImages.filter((image) => image.category === 'independence').map((image) => image.id),
    presentationDuration: 60,
  },
  {
    id: 'archive',
    slug: 'archive',
    order: 3,
    title: 'Kho tư liệu lịch sử',
    subtitle: 'Văn kiện và hình ảnh theo tiến trình lịch sử',
    argumentIds: [],
    imageIds: historicalImages.map((image) => image.id),
    presentationDuration: 35,
  },
  {
    id: 'socialism',
    slug: 'socialism',
    order: 4,
    title: 'Chủ nghĩa xã hội',
    subtitle: 'Quan niệm, tính tất yếu, mục tiêu, thời kỳ quá độ và nguyên tắc xây dựng',
    argumentIds: argumentIdsFor('socialism'),
    imageIds: [],
    presentationDuration: 90,
  },
  {
    id: 'conclusion',
    slug: 'conclusion',
    order: 5,
    title: 'Độc lập dân tộc và chủ nghĩa xã hội',
    subtitle: 'Ba chiều lập luận làm rõ quan hệ thống nhất, hai chiều giữa hai mục tiêu',
    argumentIds: argumentIdsFor('central-argument'),
    imageIds: [],
    presentationDuration: 80,
  },
  {
    id: 'conditions',
    slug: 'conditions',
    order: 6,
    title: 'Ba điều kiện bảo đảm',
    argumentIds: [],
    imageIds: [],
    presentationDuration: 35,
  },
  {
    id: 'debate',
    slug: 'debate',
    order: 7,
    title: 'Phản biện học thuật',
    argumentIds: [],
    imageIds: ['image-chanh-cuong-1930'],
    presentationDuration: 50,
  },
  {
    id: 'limitations',
    slug: 'limitations',
    order: 8,
    title: 'Giới hạn khi vận dụng',
    argumentIds: [],
    imageIds: [],
    presentationDuration: 40,
  },
  {
    id: 'sources',
    slug: 'sources',
    order: 9,
    title: 'Nguồn học thuật',
    argumentIds: [],
    imageIds: [],
    presentationDuration: 25,
  },
];
