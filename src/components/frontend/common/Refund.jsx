import React from 'react';

const Refund = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Chính sách hoàn trả</h2>
            <p className="mb-6 text-gray-700">
                Chúng tôi hiểu rằng có thể có những lúc bạn không hài lòng với sản phẩm mà bạn đã mua. 
                Dưới đây là các chính sách hoàn trả của chúng tôi để đảm bảo quyền lợi của bạn.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">1. Điều kiện hoàn trả</h3>
            <p className="mb-4 text-gray-700">
                Để đủ điều kiện hoàn trả, sản phẩm của bạn phải:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>Trong tình trạng nguyên vẹn, chưa qua sử dụng.</li>
                <li>Có bao bì gốc, tem nhãn và các phụ kiện kèm theo.</li>
                <li>Được yêu cầu hoàn trả trong vòng 14 ngày kể từ ngày nhận hàng.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">2. Quy trình hoàn trả</h3>
            <p className="mb-4 text-gray-700">
                Để yêu cầu hoàn trả, bạn cần thực hiện các bước sau:
            </p>
            <ol className="list-decimal list-inside mb-6 text-gray-700">
                <li>Liên hệ với bộ phận hỗ trợ khách hàng qua email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a>.</li>
                <li>Cung cấp thông tin đơn hàng và lý do hoàn trả.</li>
                <li>Nhận hướng dẫn từ chúng tôi về cách gửi sản phẩm trở lại.</li>
                <li>Đóng gói sản phẩm và gửi lại theo hướng dẫn.</li>
            </ol>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">3. Thời gian hoàn tiền</h3>
            <p className="mb-6 text-gray-700">
                Sau khi chúng tôi nhận được sản phẩm hoàn trả, chúng tôi sẽ kiểm tra và xử lý yêu cầu hoàn tiền trong vòng 7-10 ngày làm việc. 
                Số tiền sẽ được hoàn trả qua phương thức thanh toán mà bạn đã sử dụng khi đặt hàng.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">4. Phí hoàn trả</h3>
            <p className="mb-6 text-gray-700">
                Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ khoản phí vận chuyển nào phát sinh khi gửi lại sản phẩm, 
                trừ khi sản phẩm bị lỗi hoặc không đúng với đơn đặt hàng.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">5. Liên hệ với chúng tôi</h3>
            <p className="text-gray-700">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách hoàn trả này, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a> hoặc số điện thoại: 123-456-7890.
            </p>
        </div>
    );
};

export default Refund;
