 document.addEventListener('DOMContentLoaded', function() {
      const ctx = document.getElementById('activityChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          datasets: [
            {
              label: '活跃时长(小时)',
              data: [1.5, 2, 0.5, 3, 2.5, 4, 2],
              borderColor: '#4361ee',
              backgroundColor: 'rgba(67, 97, 238, 0.1)',
              tension: 0.4,
              fill: true,
              yAxisID: 'y'
            },
            {
              label: '互动次数',
              data: [5, 3, 1, 8, 4, 6, 2],
              borderColor: '#f72585',
              backgroundColor: 'transparent',
              tension: 0.4,
              borderDash: [],
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 6,
                font: {
                  size: 11
                }
              }
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: '时长(小时)',
                font: {
                  size: 10
                }
              },
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: '次数',
                font: {
                  size: 10
                }
              },
              beginAtZero: true,
              grid: {
                drawOnChartArea: false
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