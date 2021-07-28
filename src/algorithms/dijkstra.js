//In Dijkstra Algorithm we start with our node and relax all the node connected by it only 
// if d[u]+w<d[v] (w->v path) and greedle chooses next min distance node available to user
// and follow the same recursivly thus this is a greedy approach. 

//in shortest path we will keep track of the previous node of all the nodes in shortest path 
//so as to back track it
import Animation from "../utils/animation.js";
export function visualizeDijkstra(grid, startNode, finishNode) {
  const startNodeVisualization = grid[startNode.row][startNode.col];
  const finishNodeVisualization = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = dijkstra(
    grid,
    startNodeVisualization,
    finishNodeVisualization
  );

  const nodesInShortestPathOrder = getNodesInShortestPathOrder(
    finishNodeVisualization
  );

  Animation.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
}


export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    //priority queue can be used for optimizatin since we are sorting all node by distance and picking up the least,
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();//removes the 1st element
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    //push that least node in our animated path
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  } return visitedNodesInOrder;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};