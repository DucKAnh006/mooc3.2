// Lấy tham chiếu đến div lớn (main-display)
const mainDisplay = document.getElementById('main-display');

// Lấy tham chiếu đến tất cả các div nhỏ (thumbnail)
// Thêm tabindex="0" vào tất cả thumbnail để chúng có thể được focus (dùng phím Tab)
const thumbnails = document.querySelectorAll('.thumbnail:not(#empty-focus)'); 
thumbnails.forEach(thumb => {
    thumb.setAttribute('tabindex', '0');
});

// Lấy tham chiếu đến div trống
const emptyFocus = document.getElementById('empty-focus');


// Hàm để đặt hình ảnh mặc định ban đầu
function setDefaultDisplay(message = 'Hover or Tab to watch my pictures') {
    mainDisplay.style.backgroundImage = 'none'; // Xóa hình nền
    mainDisplay.style.color = '#333';
    mainDisplay.style.backgroundColor = '#ccc';
    mainDisplay.innerHTML = `<p style="background: rgba(255,255,255,0.7); padding: 5px 10px; border-radius: 4px;">${message}</p>`;
    mainDisplay.style.backgroundSize = 'cover';
}

// Hàm hiển thị hình ảnh
function displayImage(element) {
    const imageUrl = element.getAttribute('data-image');
    const imageText = element.getAttribute('data-text');

    mainDisplay.style.backgroundImage = `url('${imageUrl}')`;
    mainDisplay.style.backgroundColor = 'transparent';
    mainDisplay.innerHTML = `<p style="background: rgba(0,0,0,0.6); padding: 5px 10px; border-radius: 4px; color: white;">${imageText}</p>`;
}

// Đặt hiển thị mặc định khi tải trang
setDefaultDisplay();

// Lặp qua từng div nhỏ để gán sự kiện cho các ảnh
thumbnails.forEach(thumbnail => {
    // 1. Sự kiện khi di chuột vào (mouseenter)
    thumbnail.addEventListener('mouseenter', () => {
        displayImage(thumbnail);
    });

    // 2. Sự kiện khi di chuột ra (mouseleave)
    thumbnail.addEventListener('mouseleave', () => {
        // Chỉ quay lại mặc định nếu không có focus nào đang được kích hoạt
        if (document.activeElement !== thumbnail) {
            setDefaultDisplay();
        }
    });

    // 3. Sự kiện khi focus (dùng phím Tab)
    thumbnail.addEventListener('focus', () => {
        displayImage(thumbnail);
    });

    // 4. Sự kiện khi mất focus (blur)
    thumbnail.addEventListener('blur', () => {
        // Quay lại mặc định khi mất focus (trừ khi chuột đang hover)
        if (!thumbnail.matches(':hover')) {
            setDefaultDisplay();
        }
    });
});

// Logic riêng cho Div Trống (Empty Focus)
if (emptyFocus) {
    emptyFocus.addEventListener('focus', () => {
        setDefaultDisplay('Đang ở trạng thái trống. Nhấn Tab để quay lại ảnh đầu tiên.');
    });

    emptyFocus.addEventListener('blur', () => {
        setDefaultDisplay();
    });

    emptyFocus.addEventListener('mouseenter', () => {
        setDefaultDisplay('Vùng này làm trống hiển thị chính.');
    });
    
    emptyFocus.addEventListener('mouseleave', () => {
        // Giữ trạng thái trống nếu đang focus
        if (document.activeElement !== emptyFocus) {
             setDefaultDisplay();
        }
    });
}