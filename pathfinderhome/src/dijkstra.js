//In Dijkstra Algorithm we start with our node and relax all the node connected by it only 
// if d[u]+w<d[v] (w->v path) and greedle chooses next min distance node available to user
// and follow the same recursivly thus this is a greedy approach. 

export function dijkstra(grid,startNode,fin_node)
{
     const visitedNodesInIncrease=[];
     startNode.distance=0;
     const unvisitedSet=getAllNodes(grid);

     while (unvisitedSet.length!==0)
     {
         sortAllnodeByDistance(unvisitedSet);
         const minDistanceNode = unvisitedSet.shift();
         //if it's a wall then skip to next available
         if(minDistanceNode.isWall) continue;
         
           
            //if the min node is INF them we must stop and we can say that the furthur nodes
            //are not reachable or it is the end of grid
           if(minDistanceNode.distance===Infinity) return visitedNodesInIncrease;
           minDistanceNode.isVisited=1;
           visitedNodesInIncrease.push(minDistanceNode);
           if(minDistanceNode===fin_node) return visitedNodesInIncrease;
           updateUnvisitedNeighbors(minDistanceNode,grid);
        
     }

}

function sortAllnodeByDistance(unvisitedSet)
{
    unvisitedSet.sort((nodeA,nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }


function getUnvisitedNeighbors(node,grid){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes=[];
  for(const row of grid){
      for(const col of row){
          nodes.push(col);
      }
  }   return nodes;
}

export function getNodesInShortestPathOrder(fin_node)
{
    const nodesInShortestPath = [];
  let currentNode = fin_node;
  while (currentNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.parentNode;
  }
  return nodesInShortestPath;
}
