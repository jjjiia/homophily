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
//var a = {id: "a"},
//    b = {id: "b"},
//    c = {id: "c"},
//    d = {id: "d"},
//    nodes = [a, b, c, d],
//    links = [];
var size = 500
var maxFriendsEach = 1
    var newFriendships = 500
    var interval = 500
var nodes = []
var nodes2 = []

    for(var i = 0; i<size; i++){
        nodes.push({id:"random_"+i})
        nodes2.push({id:"ff_"+i})
    }
    
var links = []
var links2 = []
    
    for(var n in nodes){
        var numLinks = Math.round(Math.random()*maxFriendsEach)+1
        var existingLinks = []
        
        for(var l =0; l<numLinks; l++){
            
            var randomIndex = Math.round(Math.random()*(nodes.length-1))
            var randomTarget = nodes[randomIndex]
            var randomTarget2 = nodes2[randomIndex]
            
            if(randomTarget!=nodes[n].id && existingLinks.indexOf(randomTarget)==-1){
                existingLinks.push(randomTarget)
                links.push({source:nodes[n], target:randomTarget})
                links2.push({source:nodes2[n], target:randomTarget2})
            }
        }
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

