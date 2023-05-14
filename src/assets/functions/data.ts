export const months = ['January','February','March','April','May','June','July','August','September','Octuber','November','December']
export const colors = ['#4a4a4a','#6B728E','#fcc15a','#9ecbff','#000000']
export const chartDefaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Orders',
      },
    },
  }
export const filterByYears = [3,5]