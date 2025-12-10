import "chart.js/auto";
import { plugins } from "chart.js/auto";
import { Bar } from "react-chartjs-2";


export default function ChartBasic1(){
    const data ={
        labels: ["수도권", "강원", "충청", "전라","경상"] ,
        datasets:[
            { 
                label : "매출",
                data: [100, 50, 200],
                backgroundColor: "rgba(99,102,241, 0.5)",
                borderColor:"rgba(99,102,241,1)",
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
                    stepSize:5, //눈금간격
                },
                suggestedMax:20, // 최대값
                suggestedMin:5, // 최소값
            }
        }
    };
    return(
        <div className="w-[1000px] h-[500px] mx-auto border border-[#DFDFDF] px-[20px] py-[30px]">
            <Bar data={data}  options={options}/>
        </div>
    );
}