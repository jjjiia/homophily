//console.log(getCounts(links2,"table2",linksLine2))
//console.log(getCounts(links,"table1",linksLine1))


d3.select("#friendshipGrowth1").append("svg").attr("width",300).attr("height",170)
//drawLine(getCounts(links,"table1"),"friendshipGrowth1")
growthChart("friendshipGrowth1",linksLine1)

function growthChart(className,data){
    
    for(var i in data){
        drawLine(className,data[i],i)
        break
    }
}


function drawLine(div,linksLine,className){
    console.log(linksLine.length)
    var tempData = [2,4,5,5,6,20,30,4,5,5,6,20,30,4,5,5,6,20,30]
    
    var svg = d3.select("#"+div+" svg")
    var yScale = d3.scaleLinear().domain([0,500]).range([0,200])
    
    var linksCountLine = d3.line()
    .x(function(d,i){
        console.log([d,i])
            return i*20
    })
    .y(function(d,i){
        return d
    }) 
    
    svg
    .data([tempData])
    .attr("d",linksCountLine)
    .attr("stroke","red")
    .attr("stroke-width",2)
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
        display+="<th>"+groupNames[hg]+"</th>"
    }
    display+="</tr>"
    
    for(var fg in groupNames){
        var fgroup = groupNames[fg]
        display+="<tr><td>"+fgroup+"</td>"
        
        for(var g in groupNames){
            var group = groupNames[g]
            display+="<td>"+linksSubgroupCount[group][fgroup]+"</td>"
            linksLine[group+"_"+fgroup].push(linksSubgroupCount[group][fgroup])
            //console.log(group,fgroup,linksSubgroupCount[group][fgroup])
        }
        
         display+="</tr>"
    } 
    display+="</div>"

    d3.select("#"+div).html(display)
    
    return linksSubgroupCount
}