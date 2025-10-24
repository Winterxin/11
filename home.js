  // 初始化教学统计图表
    document.addEventListener('DOMContentLoaded', function() {
      const ctx = document.getElementById('teachingChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['已解答', '待解答', '学生互答'],
          datasets: [{
            data: [65, 15, 20],
            backgroundColor: [
              '#7209b7',
              '#f72585',
              '#4cc9f0'
            ],
            borderWidth: 0,
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                padding: 10,
                font: {
                  size: 10
                }
              }
            }
          }
        }
      });
    });