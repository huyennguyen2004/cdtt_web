import React from 'react';

const Purchase = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Chính sách mua hàng</h2>
            <p className="mb-6 text-gray-700">
                Chúng tôi cam kết cung cấp dịch vụ mua sắm trực tuyến tốt nhất cho bạn. Dưới đây là các chính sách liên quan đến quá trình mua hàng của chúng tôi.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">1. Quy trình đặt hàng</h3>
            <p className="mb-4 text-gray-700">
                Để đặt hàng, bạn chỉ cần làm theo các bước sau:
            </p>
            <ol className="list-decimal list-inside mb-6 text-gray-700">
                <li>Chọn sản phẩm bạn muốn mua và thêm vào giỏ hàng.</li>
                <li>Truy cập giỏ hàng và kiểm tra lại thông tin sản phẩm.</li>
                <li>Nhập thông tin giao hàng và thanh toán.</li>
                <li>Xác nhận đơn hàng và chờ nhận hàng.</li>
            </ol>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">2. Phương thức thanh toán</h3>
            <p className="mb-4 text-gray-700">
                Chúng tôi chấp nhận các phương thức thanh toán sau:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>Thẻ tín dụng (Visa, MasterCard)</li>
                <li>Chuyển khoản ngân hàng</li>
                <li>Thanh toán khi nhận hàng (COD)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">3. Chính sách giao hàng</h3>
            <p className="mb-6 text-gray-700">
                Chúng tôi sẽ tiến hành giao hàng trong vòng 3-5 ngày làm việc sau khi xác nhận đơn hàng. 
                Nếu có bất kỳ sự chậm trễ nào, chúng tôi sẽ thông báo cho bạn qua email.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">4. Đổi trả hàng</h3>
            <p className="mb-6 text-gray-700">
                Bạn có thể yêu cầu đổi hoặc trả hàng trong vòng 7 ngày kể từ ngày nhận hàng. 
                Sản phẩm phải còn nguyên vẹn và không bị hư hỏng. Vui lòng liên hệ với bộ phận hỗ trợ khách hàng để được hướng dẫn chi tiết.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">5. Hỗ trợ khách hàng</h3>
            <p className="text-gray-700">
                Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách mua hàng, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a> hoặc số điện thoại: 123-456-7890.
            </p>
        </div>
    );
};

export default Purchase;
