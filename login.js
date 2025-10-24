 // 密码显示/隐藏切换
    document.querySelector('.fa-eye-slash').parentElement.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const input = document.getElementById('password');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });