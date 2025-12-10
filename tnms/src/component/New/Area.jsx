import "chart.js/auto";
import { plugins } from "chart.js/auto";
import { Bar } from "react-chartjs-2";


export default function ChartBasic1(){
    const data ={
        labels: ["1월", "2월", "3월"] ,
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
            title:{ display:true, text : "월별현황"} , 
            legend:{ display:true, position:"left"},
             tooltip : { enabled:true , mode:"index", intersect:false}
        },
        scales : {
            x:{
                title : {display:true, text:"월"}
            },
            y:{
                title : {display:true, text:"매출액(만원)"}
            }
        }
    };
    return(
        <>
            <Bar data={data}  options={options}/>
        </>
    );
}