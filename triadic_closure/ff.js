var className = "B"
var mode2 = "ff"

var svg2 = d3.select("#chart2").append("svg")
    .attr("width",window.innerWidth/2)
    .attr("height",window.innerHeight)
var width = +svg2.attr("width")
var height = +svg2.attr("height")

var simulation2 = d3.forceSimulation(nodes2)
        .force("charge", d3.forceManyBody().strength(-40))
        .force("link", d3.forceLink(links).distance(10))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .alphaTarget(1)
         .on("tick", ticked2);

   var g2 = svg2.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
   var link2 = g2.append("g").attr("stroke", "red").attr("stroke-width", 1.5).attr("class","link"+mode2).selectAll(".link"+mode2)
   var node2 = g2.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).attr("class","node"+mode2).selectAll(".node"+mode2);

    restart2();
   //
   // for(var i =0; i<newFriendships; i++){
   //         addCloseFriend(2000+i*interval)
   // }         

    var sources2
    var sourcesMap2
    var targets2
    var targetsMap2
    
  
    function updateLinks2(){
        sources2 = d3.nest()
                    .key(function(d){
                        return d.source.id
                    })
                    .entries(links2)
                    
        sourcesMap2 = d3.map(sources2,function(d){return d.key})
  
        targets2 = d3.nest()
                    .key(function(d){return d.target.id})
                    .entries(links2)
                    
        targetsMap2 = d3.map(targets2,function(d){return d.key})
    }

    updateLinks2()
 
    function addCloseFriend(time){
   
        d3.timeout(function(){
            var randomId = nodes2[Math.round(Math.random()*(nodes2.length-1))]
            var friends = getNeighbors2(randomId.id)
            var friendsOfFriends = []
            for(var f in friends){
                var friendsOfFriend = getNeighbors2(friends[f].id)
                friendsOfFriends=friendsOfFriends.concat(friendsOfFriend)
            }
        
            var randomFriendOfFriend = friendsOfFriends[Math.round(Math.random()*(friendsOfFriends.length-1))]
        
            d3.select("."+randomId.id+"_"+mode2).attr("fill","red").transition().delay(interval).attr("fill","000")
            d3.select("."+randomFriendOfFriend.id+"_"+mode2).attr("fill","red").transition().delay(interval).attr("fill","#000")
        
            if(friends.indexOf(randomFriendOfFriend)==-1){
                links2.push({source:randomId,target:randomFriendOfFriend})
                updateLinks2()
                restart2()
            
            }else{
                console.log("not new friend")
            }
            d3.select("#count").html((time)/interval)
        
        },time)
    }
 // //
 // //  //https://bl.ocks.org/emeeks/9915de8989e2a5c34652
 // //
  function getNeighbors2(id){
      var linkedNodes2 = []
      if(targetsMap2.get(id)!=undefined){
          for(var t in targetsMap2.get(id).values){
              var nid = targetsMap2.get(id).values[t].source//.id
             // d3.select("."+nid).attr("fill","blue")
              //d3.select("."+nid+"_"+id).attr("stroke","orange")
              linkedNodes2.push(nid)
          }
      }
  
      if(sourcesMap2.get(id)!=undefined){
          for(var t in sourcesMap2.get(id).values){
              var nid = sourcesMap2.get(id).values[t].target//.id
            //  d3.select("."+nid).attr("fill","blue")
           //   d3.select("."+id+"_"+nid).attr("stroke","orange")
              linkedNodes2.push(nid)
          }
      }   
  
      return linkedNodes2
  }

    function restart2() {
  
      // Apply the general update pattern to the nodes.
      node2 = node2.data(nodes2, function(d) { return d.id;});
      node2.exit().remove();
      node2 = node2.enter()
          .append("circle")
          .attr("class",function(d){return d.id+"_"+mode2})
          .attr("r", 4)
          .merge(node2)
          .attr("fill","red")
          .on("mouseover",function(){
              var id = d3.select(this).attr("class").split("_")[0]
              getNeighbors2(id)
          })
  
      // Apply the general update pattern to the links.
      link2 = link2.data(links2, function(d) { return d.source.id + "-" + d.target.id; });
      link2.exit().remove();
      link2 = link2.enter()
      .append("line")
      .attr("class",function(d){
          return d.source.id + "_" + d.target.id+"_"+className;
      })
      .attr("stroke", "#aaaaaa").attr("stroke-width",.5).merge(link2);
  
      // Update and restart the simulation.
      simulation2.nodes(nodes2);
      simulation2.force("link").links(links2);
     // simulation2.alpha(1).restart();
    }