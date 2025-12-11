import "chart.js/auto";
import { plugins } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ChartBasic1(){
    const data ={
        labels: ["수도권", "강원", "충청", "전라","경상","제주"] ,
        datasets:[
            { 
                label : "횟수",
                data: [46, 71, 75, 152, 522, 68],
                backgroundColor: "rgba(153, 215, 245, 0.5)",
                borderColor:"rgba(153,215,245,1)",
                borderWidth:1
            }
        ] 
    };
    const options={
         responsive: true,  // 창의 크기에 따라 그래프가 자동으로 크기조절
        maintainAspectRatio : true, // 그래프의 가로세로 비율 유지
        plugins: {//  차트의 제목, 범례, 툴팁 등 설정
            legend:{ display:true, position:"left"},
             tooltip : { enabled:true , mode:"index", intersect:false}
        },
        scales : {
            y:{
                beginAtZero:true,
                ticks:{
                    stepSize:100, //눈금간격
                },
                suggestedMax:600, // 최대값
                suggestedMin:0, // 최소값
            }
        }
    };
    return(
        <div className="w-[1150px] h-[700px] mx-auto border border-[#DFDFDF] px-[20px] py-[50px]">
            <h3 className="text-xl font-bold ml-[120px] mb-[20px]">2016년 이후 국내 지진 발생 횟수</h3>
            <Bar data={data}  options={options}/>
        </div>
    );
}