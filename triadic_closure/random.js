    var className = "A"
    var mode = "random"

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-40))
        .force("link", d3.forceLink(links).distance(10))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .alphaTarget(1)
        .on("tick", ticked);

    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    var link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).attr("class","link"+className).selectAll(".link"+className)
    var node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).attr("class","node"+className).selectAll(".node"+className);

    restart();

    var sources
    var sourcesMap
    var targets
    var targetsMap
    updateLinks()

    function updateLinks(){
        sources = d3.nest()
                    .key(function(d){
                        return d.source.id
                    })
                    .entries(links)
        sourcesMap = d3.map(sources,function(d){return d.key})

        targets = d3.nest()
                    .key(function(d){return d.target.id})
                    .entries(links)
        targetsMap = d3.map(targets,function(d){return d.key})
    }


    for(var i =0; i<newFriendships; i++){
            addRandomFriend(i*interval)
//          addCloseFriend(2000+i*interval)
    }         
                     
    function addRandomFriend(time){
   
        d3.timeout(function(){
        
            var randomId = nodes[Math.round(Math.random()*(nodes.length-1))]
            var randomFriend = nodes[Math.round(Math.random()*(nodes.length-1))]
            var friends = getNeighbors(randomId.id)
        
            d3.select("."+randomId.id+"_"+mode).attr("fill","red").transition().delay(interval).attr("fill","000")
            d3.select("."+randomFriend.id+"_"+mode).attr("fill","red").transition().delay(interval).attr("fill","#000")
        
            if(randomId!=randomFriend && friends.indexOf(randomFriend)==-1){
                links.push({source: randomId, target: randomFriend})
            }
            restart()
            d3.select("."+randomId.id+"_"+randomFriend.id+"_"+mode).attr("stroke","red").attr("stroke-width",2).transition().delay(interval).attr("stroke","#aaa").attr("stroke-width",1)
            
            d3.select("#count").html((time)/interval)
        
        },time)
    }

    //https://bl.ocks.org/emeeks/9915de8989e2a5c34652

    function getNeighbors(id){
        var linkedNodes = []
        if(targetsMap.get(id)!=undefined){
            for(var t in targetsMap.get(id).values){
                var nid = targetsMap.get(id).values[t].source//.id
               // d3.select("."+nid).attr("fill","blue")
                //d3.select("."+nid+"_"+id).attr("stroke","orange")
                linkedNodes.push(nid)
            }
        }
    
        if(sourcesMap.get(id)!=undefined){
            for(var t in sourcesMap.get(id).values){
                var nid = sourcesMap.get(id).values[t].target//.id
              //  d3.select("."+nid).attr("fill","blue")
             //   d3.select("."+id+"_"+nid).attr("stroke","orange")
                linkedNodes.push(nid)
            }
        }   
    
        return linkedNodes
    }

    function restart() {

      // Apply the general update pattern to the nodes.
      node = node.data(nodes, function(d) { return d.id;});
      node.exit().remove();
      node = node.enter()
          .append("circle")
          .attr("class",function(d){return d.id+"_"+mode})
          .attr("r", 4)
          .merge(node)
          .on("mouseover",function(){
              var id = d3.select(this).attr("class")
              getNeighbors(id)
              d3.select(this).attr("fill","red")
      
          })
          .on("mouseout",function(){
              d3.selectAll("circle").attr("fill","#aaa")
              d3.selectAll("line").attr("stroke","#aaa")
          })

      // Apply the general update pattern to the links.
      link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
      link.exit().remove();
      link = link.enter()
      .append("line")
      .attr("class",function(d){
          return d.source.id + "_" + d.target.id+"_"+mode;
      })
      .attr("stroke", "#aaaaaa").attr("stroke-width",.5).merge(link);

      // Update and restart the simulation.
      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart();
    }