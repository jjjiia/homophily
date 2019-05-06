//console.log(getCounts(links2,"table2",linksLine2))
//console.log(getCounts(links,"table1",linksLine1))

var svgH = 170
var svgW = 300
var padding = 20
d3.select("#friendshipGrowth1").append("svg").attr("width",svgW).attr("height",svgH)
d3.select("#friendshipGrowth2").append("svg").attr("width",svgW).attr("height",svgH)
//drawLine(getCounts(links,"table1"),"friendshipGrowth1")
//growthChart("friendshipGrowth1",linksLine1)

function growthChart(className,data){
    
    var inGroupPairs = ["_0__0","_1__1","_2__2"]
    for(var i in data){
        if(inGroupPairs.indexOf(i)>-1){
            drawLine(className,data[i],i,"red")
        }else{
            drawLine(className,data[i],i,"black")
        }
    }
}


function drawLine(div,linksLine,className,color){
    var tempData = [2,4,5,5,6,20,30,4,5,5,6,20,30,4,5,5,6,20,30]
    
    var svg = d3.select("#"+div+" svg")
    var yScale = d3.scaleLinear().domain([0,300]).range([svgH,0])
    var xScale = d3.scaleLinear().domain([0,newFriendships]).range([padding,svgW])
    
    //var linksCountLine = d3.line()
    //.x(function(d,i){
    //    console.log([d,i])
    //        return i*20
    //})
    //.y(function(d,i){
    //    return d
    //}) 
    //
    //svg
    //.data([tempData])
    //.attr("d",linksCountLine)
    //.attr("stroke","red")
    //.attr("stroke-width",2)
        d3.selectAll("."+className+div).remove()
        
        
        svg.append("text").text(className).attr("x",0).attr("y",yScale(linksLine[0])).attr('class',className+div)

        
        svg.selectAll("."+className+div)
            .data(linksLine)
            .enter()
            .append("circle")
            .attr('class',className+div)
            .attr("cx",function(d,i){return xScale(i)})
            .attr("cy",function(d,i){return yScale(d)})
            .attr("r",.5)
            .attr("fill",color)
       
}

function getCounts(linkData,div,linksLine){
    
    var groupNames= ["_0","_1","_2"]
    
    //get data by source group
    var linksBySG = d3.nest().key(function(d){
                    return d.source.group
                })
                .entries(linkData)
                
   
                
    
    var linksBySGDict = {}
    var linksSubgroupCount = {}
    
    for(var i =0;i<linksBySG.length; i++){      
          var ck = linksBySG[i].key
        
        //get sourcegroup data by target group
        linksBySGDict[ck]= d3.nest().key(function(d){
                    return d.target.group
                })
                .entries(linksBySG[i].values)
                
                
        linksSubgroupCount[linksBySG[i].key]={}
        
        //iterate through target group
        for(var j in linksBySGDict[ck]){
            
            var jk = linksBySGDict[ck][j].key
            var jv = linksBySGDict[ck][j].values
            
            linksSubgroupCount[ck][jk]=jv.length
        }
    }
    var display = "<table><tr><th>  </th>"
    for(var hg in groupNames){
        display+="<th><span style=\"font-size:18px; color:"+groupColor[groupNames[hg]]+"\">"+groupNames[hg].replace("_","")+"</span></th>"
    }
    display+="</tr>"
    
    var sums = {}
    
    for(var fg in groupNames){
        var fgroup = groupNames[fg]
        
        display+="<tr><td><span style=\"font-size:18px; color:"+groupColor[fgroup]+"\">"+fgroup.replace("_","")+"</span></td>"
        sums[fg]=0
        
        for(var g in groupNames){
            var group = groupNames[g]
            sums[fg]+=linksSubgroupCount[fgroup][group]
            display+="<td>"+linksSubgroupCount[group][fgroup]+"</td>"
            linksLine[group+"_"+fgroup].push(linksSubgroupCount[group][fgroup])
            //console.log(group,fgroup,linksSubgroupCount[group][fgroup])
        }
        
         display+="</tr>"
    } 
    display+="</div>"

    d3.select("#"+div).html(display)
   // console.log(div)
   // console.log(sums)
    return linksSubgroupCount
}