document.addEventListener("DOMContentLoaded", function () {
    // EChart rendering function
    function renderEChart() {
      // EChart code goes here
      const echartContainer = document.querySelector("#echart-container");
      // EChart initialization and rendering
      // Example:
      const chart = echarts.init(echartContainer);
      const option = {
        // EChart options
      };
      chart.setOption(option);
    }
  
    // Detect if the page is the EChart page
    if (window.location.pathname.includes("echart.html")) {
      renderEChart();
    }
  });
  