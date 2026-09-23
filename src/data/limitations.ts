import type { Limitation } from '@/types';

export const limitations: Limitation[] = [
  {
    id: 'no-copy',
    title: 'Không rập khuôn mô hình nước khác',
    statement: 'Không sao chép nguyên xi một mô hình bên ngoài khi điều kiện lịch sử, địa lý, kinh tế và phong tục của Việt Nam khác biệt.',
    evidenceIds: ['evidence-principle-international-learning'],
    analysis: 'Có thể kế thừa nguyên tắc và học hỏi kinh nghiệm quốc tế, nhưng cách thực hiện phải được lựa chọn phù hợp với hoàn cảnh Việt Nam.',
  },
  {
    id: 'no-rush',
    title: 'Không nóng vội hoặc đốt cháy giai đoạn',
    statement: 'Không dùng mục tiêu cuối cùng để biện minh cho việc bỏ qua điều kiện và quy luật của từng giai đoạn trong thời kỳ quá độ.',
    evidenceIds: ['evidence-socialism-transition'],
    analysis: 'Xuất phát điểm thấp làm cho quá trình xây dựng CNXH lâu dài, khó khăn và phức tạp; vì thế bước đi phải phù hợp với năng lực thực tế và mục tiêu cải thiện đời sống nhân dân.',
  },
  {
    id: 'no-false-modernization',
    title: 'Tránh hiện đại hóa giả',
    statement: 'Không gán các thuật ngữ hoặc vấn đề hiện đại thành những phát biểu trực tiếp của Hồ Chí Minh nếu không có bằng chứng.',
    evidenceIds: [],
    analysis: 'Cần phân biệt tư tưởng nguyên bản với cách phát triển hoặc vận dụng về sau. Có thể dùng phương pháp và giá trị cốt lõi để phân tích vấn đề mới, nhưng không được đặt lời đương đại vào văn bản lịch sử.',
  },
  {
    id: 'historical-context',
    title: 'Đặt nội dung trong hoàn cảnh lịch sử cụ thể',
    statement: 'Mỗi nhận định phải được đọc cùng nhiệm vụ lịch sử, bối cảnh trong nước và tình hình quốc tế của thời điểm nó xuất hiện.',
    evidenceIds: ['evidence-socialism-inevitable'],
    analysis: 'Cách tiếp cận lịch sử – cụ thể giúp tránh tách câu chữ khỏi hệ thống tư tưởng hoặc biến một chỉ dẫn theo hoàn cảnh thành công thức áp dụng cho mọi thời kỳ.',
  },
];

export const limitationWarnings = limitations;
