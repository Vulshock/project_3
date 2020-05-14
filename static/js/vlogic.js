let ydata
let citydata
let gundata
// d3.json("/all").then(function(data){
//     console.log(data)
    
// })

d3.json("../static/data/df_gvdata.json").then(function(data){
    console.log(data)
    ydata=data
    init()
    createMenu()
})

d3.select("selDataset").on("change", optionChanged) 

d3.json("../static/data/gvdata_city.json").then(function(data){
    citydata=data
    initCity()
})
d3.json("../static/data/num_firarms.json").then(function(data){
    gundata=data
    gunGraph()
    console.log(gundata)
})
function gunGraph(){
    var fiscal_years=gundata.Fiscal_Year;
    console.log(fiscal_years)
    var Firearms_Processed=gundata.Firearms_Processed
    var years=[]
    var num_arms=[]
    Object.values(fiscal_years).forEach(value=>{
        years.push(value)
    })
    console.log(years)
    Object.values(Firearms_Processed).forEach(value=>{
        num_arms.push(value)
    })
    console.log(num_arms)
    function gun_init_graph(){
        var trace = [{
            x: years,
            y: num_arms,
            
            type: "line"
        }];
        var layout_in = {
            title: "Number of NFA Firearms Processed by Fiscal Year",
            xaxis:{title:{ text:`Fiscal Year`}}

            
        };
        Plotly.newPlot("gunbar", trace, layout_in);
    }
    gun_init_graph() 
}
// d3.json("static/data/gun_own_by_state.json").then(function(data){
//     dataset=data.data
//     console.log(dataset)
//     var state=[]
//     var gunOwnership=[]
//     var pop=[]
//     var totalGuns=[]
//     for (var i=0; i<dataset.length; i++){
//         state.push(dataset[i].State)
//         pop.push(dataset[i].Pop)
//         gunOwnership.push(dataset[i].gunOwnership)
//         totalGuns.push(dataset[i].totalGuns)
//     }
//     console.log(state)
//     console.log(pop)
//     console.log(gunOwnership)
//     console.log(totalGuns)
//     // title: "By 2020, Gun Ownership By State by Population 2020",
    
// })
function optionChanged(){
    var selectValue=d3.select("#selDataset").property("value")
        console.log(selectValue)
        updateYear(selectValue)
        updateCity(selectValue)
}
function createMenu(){
    var selectOption=d3.select("#selDataset")
    for (var i=0; i<6; i++){
        selectOption.append("option")
                    .text(2013+i)
                    .property("value", 2013+i) 
    }
}
function initCity(){
    var Select2014value=citydata.filter(d=>d.year==2014);
    var city_arr=[];
    var killed_arr=[];
    console.log(Select2014value)
    for (var i=0; i<10; i++){
        city_arr.push(Select2014value[i].city_or_county)
        killed_arr.push(Select2014value[i].Killed)
    }
    var incity_trace=[{
        x:city_arr,
        y:killed_arr,
        name: 'ppl killed',
        marker: {
            color: 'rgb(158,202,225)'
        },
        type: "bar" 
        }]
    
    var layout_in_city={
        title: `GV in Year 2013: City Vs. # of People got Killed `,
        xaxis:{title:{ text:`City`}},
        showlegend: false
    }
    Plotly.newPlot("cbar",incity_trace,layout_in_city)  
}
function updateCity(selectValue){
    var selectValue=d3.select("#selDataset").property("value");
    var Selectvalue=citydata.filter(d=>d.year=selectValue);
    console.log(Selectvalue)
    var city_arr=[];
    var killed_arr=[];
    for (var i=0; i<10; i++){
        city_arr.push(Selectvalue[i].city_or_county)
        killed_arr.push(Selectvalue[i].Killed)
    }
    var city_trace=[{
        x:city_arr,
        y:killed_arr,
        name: 'ppl killed',
        type: "bar" 
        }]
   
    var layout_city={
        title: `GV in Year ${selectValue}: City Vs. # of People got Killed `,
        xaxis:{title:{ text:`City`}},
        showlegend: false
    }
    Plotly.newPlot("cbar",city_trace,layout_city)  
}
function init() {
    var Select2013value=ydata.filter(d=>d.year==2013);
    var state_arr=[]
    var killed_arr=[]
    var injured_arr=[]
    for (var i=0; i<Select2013value.length; i++){
        state_arr.push(Select2013value[i].state)
        killed_arr.push(Select2013value[i].Killed)
        injured_arr.push(Select2013value[i].Injured)
    }
    // console.log(state_arr)
    // console.log(killed_arr)
    var in_trace={
        x:state_arr,
        y:killed_arr,
        name: 'ppl killed',
        type: "bar" 
        }
    var in_trace2={
        x:state_arr,
        y:injured_arr,
        name: 'ppl injuried',
        type: "bar" 
        }
    var init_trace=[in_trace,in_trace2]
    
    var layout_in={
        title: `Gun Violence in Year 2013: State Vs. Numbers of People got Killed and Injuried`,
        xaxis:{title:{ text:`State`}},
        showlegend: false
    }
    Plotly.newPlot("sbar",init_trace,layout_in)  
}

function updateYear(selectValue){
    var selectValue=d3.select("#selDataset").property("value");
    var Selectvalue=ydata.filter(d=>d.year=selectValue);
    console.log(Selectvalue)
    var state_arr=[]
    var killed_arr=[]
    var injured_arr=[]
    for (var i=0; i<Selectvalue.length; i++){
        state_arr.push(Selectvalue[i].state)
        killed_arr.push(Selectvalue[i].Killed)
        injured_arr.push(Selectvalue[i].Injured)
    }
    console.log(state_arr)
    console.log(killed_arr)
    var trace1={
        x:state_arr,
        y:killed_arr,
        name: 'ppl killed',
        type: "bar" 
        }
    var trace2={
        x:state_arr,
        y:injured_arr,
        name: 'ppl injuried',
        type: "bar" 
    }
    var year_trace=[trace1,trace2]
    var layout1={
        title: `Gun Violence in Year ${selectValue}: State Vs. Numbers of People got Killed & Injuried`,
        xaxis:{title:{ text:`State`}}
    }
    Plotly.newPlot("sbar",year_trace,layout1)    
}


