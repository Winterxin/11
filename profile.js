    // 初始化教学数据图表
    document.addEventListener('DOMContentLoaded', function() {
      const ctx = document.getElementById('teachingChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['第1周', '第2周', '第3周', '第4周'],
          datasets: [{
            label: '解答问题数',
            data: [65, 78, 52, 86],
            backgroundColor: '#7209b7',
            borderRadius: 4,
            barPercentage: 0.6
          }, {
            label: '学生提问数',
            data: [82, 95, 70, 102],
            backgroundColor: '#4cc9f0',
            borderRadius: 4,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 6
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    });