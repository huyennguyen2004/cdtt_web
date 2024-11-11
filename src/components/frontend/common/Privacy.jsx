import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Chính sách bảo mật</h2>
            <p className="mb-6 text-gray-700">
                Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng trang web của chúng tôi.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">1. Thông tin chúng tôi thu thập</h3>
            <p className="mb-6 text-gray-700">
                Chúng tôi có thể thu thập thông tin cá nhân như tên, địa chỉ email và thông tin liên hệ khác khi bạn đăng ký hoặc sử dụng dịch vụ của chúng tôi.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">2. Cách chúng tôi sử dụng thông tin</h3>
            <p className="mb-4 text-gray-700">Chúng tôi có thể sử dụng thông tin cá nhân của bạn để:</p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>Cung cấp và cải thiện dịch vụ của chúng tôi.</li>
                <li>Gửi thông tin và cập nhật về dịch vụ.</li>
                <li>Liên hệ với bạn về các vấn đề hỗ trợ và phản hồi.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">3. Bảo vệ thông tin của bạn</h3>
            <p className="mb-6 text-gray-700">
                Chúng tôi thực hiện các biện pháp bảo mật thích hợp để bảo vệ thông tin cá nhân của bạn khỏi việc mất mát, truy cập trái phép hoặc lạm dụng.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">4. Thay đổi chính sách</h3>
            <p className="mb-6 text-gray-700">
                Chúng tôi có thể cập nhật chính sách quyền riêng tư này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào thông qua email hoặc thông báo trên trang web của chúng tôi.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-blue-800">5. Liên hệ với chúng tôi</h3>
            <p className="text-gray-700">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư này, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a>.
            </p>
        </div>
    );
};

export default Privacy;
