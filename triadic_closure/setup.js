var svg = d3.select("#chart1").append("svg")
    .attr("width",window.innerWidth/2)
    .attr("height",window.innerHeight)
var width = +svg.attr("width")
var height = +svg.attr("height")
    
var svg2 = d3.select("#chart2").append("svg")
    .attr("width",window.innerWidth/2)
    .attr("height",window.innerHeight)
var width = +svg2.attr("width")
var height = +svg2.attr("height")

var groupColor = {
    _0:"#cf5633",
    _1:"#6a7bcb",
    _2:"#bf9441"
}

var linksLine1 = formatForLinegraph()
var linksLine2 = formatForLinegraph()

function formatForLinegraph(){
    var lineData ={}
    var groupNames= ["_0","_1","_2"]
    for(var g in groupNames){
        for(var f in groupNames){
            lineData[groupNames[g]+"_"+groupNames[f]]=[]
        }
    }
    return lineData
}

//var a = {id: "a"},
//    b = {id: "b"},
//    c = {id: "c"},
//    d = {id: "d"},
//    nodes = [a, b, c, d],
//    links = [];
var distance = 10
var strength = -40
var size = 500
//var maxFriendsEach = 1
var newFriendships = 1000
var interval = 500
var inGroup = 1
var outGroup = 1
var delay = 5000

d3.select("#initial").html(
    "<br/><strong>group size:</strong><br/>"+size+"<br/><br/>"+
    "<strong>connections:</strong><br/> "+inGroup+" friends in same group<br/>"+
    outGroup+" friends out of group<br/><br>"
    +"<strong>Adding new connections: </strong><br>"+newFriendships

)


var nodes = []
var nodes2 = []

    for(var i = 0; i<size; i++){
        var groupNumber = "_"+Math.round(Math.random()*2)
        nodes.push({id:"random_"+i,group:groupNumber})
        nodes2.push({id:"ff_"+i,group:groupNumber})
    }
    
var links = []
var links2 = []


    for(var n in nodes){
        var inGroupFriendLeft = inGroup
        var outGroupFriendLeft = outGroup
        var existingLinks = []
        
        while(inGroupFriendLeft>0){
            var randomIndex = Math.round(Math.random()*(nodes.length-1))
            var randomTarget = nodes[randomIndex]
            var randomTarget2 = nodes2[randomIndex]
            if(randomTarget.id!=nodes[n].id && existingLinks.indexOf(randomTarget)==-1&& nodes[n].group==randomTarget.group){
                existingLinks.push(randomTarget)
                links.push({source:nodes[n], target:randomTarget})
                links2.push({source:nodes2[n], target:randomTarget2})
                inGroupFriendLeft=inGroupFriendLeft-1
            }
        }
        
        while(outGroupFriendLeft>0){
            var randomIndex = Math.round(Math.random()*(nodes.length-1))
            var randomTarget = nodes[randomIndex]
            var randomTarget2 = nodes2[randomIndex]
            if(randomTarget.id!=nodes[n].id && existingLinks.indexOf(randomTarget)==-1&& nodes[n].group!=randomTarget.group){
                existingLinks.push(randomTarget)
                links.push({source:nodes[n], target:randomTarget})
                links2.push({source:nodes2[n], target:randomTarget2})
                outGroupFriendLeft=outGroupFriendLeft-1
            }
        }
    }
  
    //for(var n in nodes){
    //    var numLinks = Math.round(Math.random()*maxFriendsEach)+1
    //    var existingLinks = []
    //    
    //    for(var l =0; l<numLinks; l++){
    //        
    //        var randomIndex = Math.round(Math.random()*(nodes.length-1))
    //        var randomTarget = nodes[randomIndex]
    //        var randomTarget2 = nodes2[randomIndex]
    //        
    //        if(randomTarget.id!=nodes[n].id && existingLinks.indexOf(randomTarget)==-1){
    //            existingLinks.push(randomTarget)
    //            links.push({source:nodes[n], target:randomTarget})
    //            links2.push({source:nodes2[n], target:randomTarget2})
    //        }
    //    }
    //}
    
function netWorkDensity(links, nodes){
    var pc = (nodes*(nodes-1))/2
    var nd = links/pc
    return nd
}
    
function ticked() {
    
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
} 

function ticked2() {
    
  node2.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link2.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
} 

