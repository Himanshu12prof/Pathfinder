
import Animation from "../utils/animation.js";
import Stack from "../algorithms/stack.js";
export function visualizeDFS(grid, startNode, finishNode) {
  const startNodeVisualization = grid[startNode.row][startNode.col];
  const finishNodeVisualization = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = DFS(
    grid,
    startNodeVisualization,
    finishNodeVisualization
  );

  const nodesInShortestPathOrder = getNodesInShortestPathOrder(
    finishNodeVisualization
  );

  Animation.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

export function DFS(grid, startNode, finishNode) {
   const stack=new Stack();
   const visitedNodesInOrder = [];
   stack.push(startNode);
   while(!!stack.size())
   {
     const top=stack.pop();
     if(top==finishNode) return visitedNodesInOrder;
     if (!top.isWall && (top.isStart || !top.isVisited) ) {
      top.isVisited = true;
      visitedNodesInOrder.push(top);
     const adjacent=updateUnvisitedNeighbors(top,grid);
     for (const node of adjacent)
     {
      stack.push(node);
     }
    }
  }

   
   return visitedNodesInOrder;
}

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  const newnodes = []
  for (const neighbor of unvisitedNeighbors) {
       neighbor.previousNode = node;
       newnodes.push(neighbor)
  }
  return newnodes;
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