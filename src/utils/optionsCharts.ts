import type { DataOptions } from "../types/types";

export const getOptionCategories = (data: DataOptions[]) => {
  const baseOption = {
    color: '#533ac8',
    title: {
      text: "Category Distribution",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: data?.map((item) => item.name),
    },
    series: [
      {
        name: "Total",
        type: "bar",
        data: data?.map((item) => item.value),
      },
    ],
  };

  return baseOption;
};

export const getOptionExpensesAndIncome = (data: DataOptions[]) => {
  const baseOption = {
    color: '#533ac8',
    title: {
      text: "Income vs. Expenses",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data?.map((item) => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data?.map((item) => item.value),
        type: "line",
        areaStyle: {},
      },
    ],
  };

  return baseOption;
};

export const getOptionTopFiveCategories = (
  data: DataOptions[],
  isMobile: boolean,
  isTablet: boolean,
) => {
  const baseOption = {
    backgroundColor: "transparent",
    color: ["#667EEA", "#A0D995", "#F6C456", "#F76C6C", "#64CFF6"],

    title: {
      text: "Top 5 Categories",
      left: "center",
      top: isMobile ? 10 : 20,
      textStyle: {
        fontSize: isMobile ? 16 : isTablet ? 20 : 24,
        fontWeight: "bold",
        color: "#333",
      },
    },

    tooltip: {
      show: !isMobile,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: isMobile ? 12 : 14,
      },
    },

    legend: {
      orient: "vertical",
      left: isMobile ? "center" : "left",
      top: isMobile ? "auto" : "middle",
      bottom: isMobile ? -10 : "auto",
      itemGap: isMobile ? 8 : 12,
      itemWidth: isMobile ? 18 : 20,
      itemHeight: isMobile ? 13 : 14,
      textStyle: {
        fontSize: isMobile ? 12 : 14,
        color: "#333",
        rich: {
          bold: {
            fontWeight: "bold",
            color: "#333", // Puedes cambiar el color si quieres
          },
        },
      },
      padding: isMobile ? 15 : 20,
      formatter: (name: string) => {
        if (isMobile) {
          const item = data.find((d) => d.name === name);
          if (item) {
            const total = data.reduce((sum, d) => sum + d.value, 0);
            const percentage = ((item.value / total) * 100).toFixed(1);
            return `${name} -  {bold|${percentage}%}`;
          }
        }
        return name;
      },
    },

    series: [
      {
        name: "Category:",
        type: "pie",
        radius: "50%",
        center: isMobile ? ["50%", "35%"] : ["50%", "50%"],

        data: data,

        label: {
          show: !isMobile,
          position: "outside",
          formatter: "{b}\n{d}%",
          fontSize: isMobile ? 10 : isTablet ? 11 : 13,
          color: "#333",
        },

        labelLine: {
          show: !isMobile,
          length: isMobile ? 10 : isTablet ? 15 : 20,
          length2: isMobile ? 5 : isTablet ? 10 : 15,
        },

        itemStyle: {
          borderColor: "#fff",
          borderWidth: isMobile ? 2 : 3,
          borderRadius: isMobile ? 4 : 8,
        },

        emphasis: {
          show: !isMobile,
          scaleSize: isMobile ? 5 : 10,
          itemStyle: {
            shadowBlur: isMobile ? 10 : 20,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
          label: {
            show: !isMobile,
            fontSize: isMobile ? 12 : isTablet ? 14 : 16,
            fontWeight: "bold",
          },
        },
      },
    ],
  };

  return baseOption;
};
