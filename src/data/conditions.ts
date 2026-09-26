import type { GuaranteeCondition } from '@/types';

export const guaranteeConditions: GuaranteeCondition[] = [
  {
    id: 'condition-party-leadership',
    order: 1,
    title: 'Bảo đảm vai trò lãnh đạo của Đảng Cộng sản',
    summary: 'Điều kiện về vai trò lãnh đạo và định hướng của cách mạng.',
    analysis: 'Vai trò lãnh đạo của Đảng bảo đảm cách mạng Việt Nam đi theo con đường đã xác định, từ cách mạng dân tộc dân chủ đến cách mạng xã hội chủ nghĩa.',
    evidenceIds: ['evidence-condition-party'],
  },
  {
    id: 'condition-national-unity',
    order: 2,
    title: 'Củng cố khối đại đoàn kết dân tộc',
    summary: 'Điều kiện về sức mạnh đoàn kết trong nước.',
    analysis: 'Đại đoàn kết dân tộc, với nền tảng là liên minh công nhân – nông dân, tập hợp và phát huy sức mạnh của toàn dân để thực hiện, bảo vệ các mục tiêu cách mạng.',
    evidenceIds: ['evidence-condition-national-unity'],
  },
  {
    id: 'condition-international-solidarity',
    order: 3,
    title: 'Gắn bó chặt chẽ với cách mạng thế giới',
    summary: 'Điều kiện về sức mạnh và sự gắn kết quốc tế.',
    analysis: 'Đoàn kết quốc tế đặt cách mạng Việt Nam trong mối quan hệ với cách mạng và các phong trào tiến bộ trên thế giới, từ đó tạo thêm sức mạnh để thực hiện mục tiêu của mình.',
    evidenceIds: ['evidence-condition-international-solidarity'],
  },
];

export const guaranteeConclusion = 'Ba điều kiện phải được bảo đảm và gắn bó chặt chẽ với nhau để góp phần bảo vệ nền độc lập dân tộc và chủ nghĩa xã hội.';
