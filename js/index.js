const register = document.querySelector(".register");
const modal = document.querySelector(".modall");

const hide = document.querySelector(".icon-head");



function openModal(){
    modal.classList.add('open');
}


register.addEventListener('click', openModal);

function hideModal(){
    modal.classList.remove('open');
}
hide.addEventListener('click', hideModal);
document.getElementById("service").addEventListener("change", function() {
            document.getElementById("servicePrice").value = this.value;
            calculateTotal();
        });

        // Câu 5: Tính tiền đồ dùng và tổng tiền
        const equipmentCheckboxes = document.querySelectorAll(".equipment");
        equipmentCheckboxes.forEach(checkbox => checkbox.addEventListener("change", calculateEquipmentPrice));

        function calculateEquipmentPrice() {
            let equipmentTotal = 0;
            equipmentCheckboxes.forEach(checkbox => {
                if (checkbox.checked) equipmentTotal += parseInt(checkbox.value);
            });
            document.getElementById("equipmentPrice").value = equipmentTotal;
            calculateTotal();
        }

        function calculateTotal() {
            const servicePrice = parseInt(document.getElementById("servicePrice").value) || 0;
            const equipmentPrice = parseInt(document.getElementById("equipmentPrice").value) || 0;
            document.getElementById("totalPrice").value = servicePrice + equipmentPrice;
        }

        // Câu 1-3: Validate mã học viên, họ tên và email
        function validateForm() {
            const studentCode = document.getElementById("studentCode").value;
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;

            const studentCodePattern = /^\d{2}-\d{8}$/;
            const fullNamePattern = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@iuh\.edu\.vn$/;

            if (!studentCodePattern.test(studentCode)) {
                alert("Mã học viên không hợp lệ! (xx-yyyyyyyy)");
                return false;
            }
            if (!fullNamePattern.test(fullName)) {
                alert("Họ tên phải có ít nhất 2 từ và viết hoa đầu từ.");
                return false;
            }
            if (!emailPattern.test(email)) {
                alert("Email phải có đuôi @iuh.edu.vn");
                return false;
            }
            return true;
        }

        // Câu 6: Cập nhật thông tin vào bảng khi thanh toán
        function submitForm() {
            if (!validateForm()) return;

            const studentCode = document.getElementById("studentCode").value;
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const servicePrice = document.getElementById("servicePrice").value;
            const equipmentPrice = document.getElementById("equipmentPrice").value;
            const totalPrice = document.getElementById("totalPrice").value;

            const table = document.getElementById("student-info");
            const row = table.insertRow();
            row.innerHTML = `
                <td>${table.rows.length}</td>
                <td>${studentCode}</td>
                <td>${fullName}</td>
                <td>${email}</td>
                <td>${servicePrice}</td>
                <td>${equipmentPrice}</td>
                <td>${totalPrice}</td>
            `;
            hideModal();
        }

        function hideModal() {
            modal.classList.remove('open');
            document.getElementById("paymentForm").reset();
            document.getElementById("servicePrice").value = '';
            document.getElementById("equipmentPrice").value = '';
            document.getElementById("totalPrice").value = '';
        }