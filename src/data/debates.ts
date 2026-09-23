import type { Debate } from '@/types';

export const debates: Debate[] = [
  {
    id: 'debate-nationalism-only',
    counterArgument: 'Có quan điểm cho rằng Hồ Chí Minh chỉ theo chủ nghĩa dân tộc, mục tiêu duy nhất là độc lập; CNXH chỉ được đưa vào sau.',
    evidenceIds: ['evidence-central-prerequisite', 'evidence-independence-happiness'],
    analysis: 'Chánh cương vắn tắt năm 1930 cho thấy nhiệm vụ giải phóng dân tộc đã được đặt trong phương hướng đi tới xã hội cộng sản. Nội hàm độc lập vì hạnh phúc của nhân dân cũng cho thấy độc lập không phải điểm kết thúc tự thân.',
    rebuttal: 'Định hướng xây dựng xã hội mới đã xuất hiện trong văn kiện nền tảng năm 1930; vì vậy, không thể xem chủ nghĩa xã hội là một mục tiêu được ghép thêm về sau.',
  },
  {
    id: 'debate-marxism-opposition',
    counterArgument: 'Có quan điểm cho rằng tư tưởng Hồ Chí Minh tách rời hoặc đối lập với chủ nghĩa Mác – Lênin.',
    evidenceIds: ['evidence-principle-marx-lenin', 'evidence-socialism-inevitable'],
    analysis: 'Chủ nghĩa Mác – Lênin là nền tảng lý luận của quá trình xây dựng chủ nghĩa xã hội, đồng thời phải được cụ thể hóa theo từng hoàn cảnh. Sự khác biệt trong cách vận dụng xuất phát từ điều kiện Việt Nam, không phải từ việc phủ nhận nền tảng lý luận.',
    rebuttal: 'Tư tưởng Hồ Chí Minh thể hiện sự kế thừa và vận dụng sáng tạo chủ nghĩa Mác – Lênin. Trung thành với nền tảng lý luận không đồng nghĩa với sao chép máy móc một mô hình cụ thể.',
  },
];

export const debatePanels = debates;
