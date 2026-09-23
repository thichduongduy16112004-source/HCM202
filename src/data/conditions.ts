import type { GuaranteeCondition } from '@/types';

export const guaranteeConditions: GuaranteeCondition[] = [
  {
    id: 'condition-party-leadership',
    order: 1,
    title: 'Sự lãnh đạo của Đảng Cộng sản Việt Nam',
    summary: 'Định hướng đường lối và giữ vững mục tiêu độc lập dân tộc gắn với CNXH.',
    analysis: 'Đảng giữ vai trò tổ chức, định hướng và dẫn dắt quần chúng trong quá trình thực hiện hai mục tiêu.',
    evidenceIds: ['evidence-condition-party'],
  },
  {
    id: 'condition-national-unity',
    order: 2,
    title: 'Khối đại đoàn kết toàn dân tộc',
    summary: 'Tạo sức mạnh nội sinh cho xây dựng và bảo vệ Tổ quốc.',
    analysis: 'Quần chúng nhân dân là chủ thể và động lực; việc tập hợp lực lượng rộng rãi biến mục tiêu chung thành sức mạnh thực tiễn.',
    evidenceIds: ['evidence-condition-national-unity'],
  },
  {
    id: 'condition-international-solidarity',
    order: 3,
    title: 'Đoàn kết với cách mạng thế giới',
    summary: 'Kết hợp sức mạnh dân tộc với sức mạnh thời đại.',
    analysis: 'Sự ủng hộ của các lực lượng hòa bình và tiến bộ tạo thêm điều kiện quốc tế thuận lợi, đồng thời không thay thế nội lực và quyền tự quyết.',
    evidenceIds: ['evidence-condition-international-solidarity'],
  },
];
