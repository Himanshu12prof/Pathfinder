import React, {Component} from 'react';
import Node from './Node';
import './PathfinderVisualizer.css'
import {dijkstra , getNodesInShortestPathOrder} from './dijkstra';
const start_node_r=10;
const start_node_c=5;
const fin_node_r=10;
const fin_node_c=20;


export default class PathfinderVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state={

      grid:[],
  mouseIspressed:false,
    }; //empty state
  }

  componentDidMount() {
    const grid=InitializeGrid();
    this.setState({grid})
    }

  handleMouseDown(row, col){
    const newGrid=getNewGridwithWall(this.state.grid,row,col)
    //at row col we  have the mouse key pressed
    this.setState({grid :newGrid,mouseIspressed:true});
  }
  handleMouseEnter(row,col){
    if(!this.state.mouseIspressed) return;
    const newGrid =getNewGridwithWall(this.state.grid,row,col);
    this.setState({grid:newGrid});
  }

  handleMouseup(){
    this.setState({mouseIspressed:false});
  }

DijkstraAnimation(visitedNodesInIncrease,nodesInShortestPath){
      for(let i=0;i<=visitedNodesInIncrease.length;i++)
      {
        if(i=== visitedNodesInIncrease.length)
        {
          setTimeout(()=>{
            this.ShortestPathAnimation(nodesInShortestPath);
          },10*i
          );
        return;
        }
        //change all the current in heap nodes properties to visited by changing there class name
setTimeout(()=>{
  const node=visitedNodesInIncrease[i];
  document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
}, 10*i  );


      }     
}
ShortestPathAnimation(nodesInShortestPath)
{
  for(let i=0; i<nodesInShortestPath.length;i++){
    setTimeout(()=>{
      const node=nodesInShortestPath[i];
      document.getElementById(`node-${node.row}-${node.col}`).className='node node_in_shortest_path';
    } ,50*i);
  }
}


visualizeDijkstra()
{
  const {grid}=this.state;
  const startNode=grid[start_node_r][start_node_c];
  const fin_node= grid[fin_node_r][fin_node_c];
  //passing grid ,start and finish node to dijjkstra function
  const visitedNodesInIncrease= dijkstra(grid,startNode,fin_node);
  const nodesInShortestPath= getNodesInShortestPathOrder(fin_node);
  this.DijkstraAnimation(visitedNodesInIncrease,nodesInShortestPath);
}

  render(){
    const {grid,mouseIspressed}=this.state;
    console.log(grid);
    return (
      <>
      <button onClick={()=> this.visualizeDijkstra()}>
        Let's go ,Visualize Dijkstra Animation
      </button>
      <div className="grid-container">
       {grid.map((row,rowIdx)=>{
         return (
         <div key={rowIdx}>
           {row.map((node,nodeIdx) => {
            const {row,col,isFin,isStart,isWall} = node;
           
           return (
           <Node 
           key={nodeIdx}
           col={col}
           row={row}
           isWall={isWall}
           isStart={isStart}
           isFin={isFin}
           mouseIspressed={mouseIspressed}
           onMouseDown={(row,col) => this.handleMouseDown(row,col)}
           onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
          onMousup={() => this.handleMouseup()}
           ></Node>
            );
           
          } ) }
         </div>
         );
        })}
      </div>
      </>
    );
  }
}

const InitializeGrid = () =>{
 const grid=[];
 for (let row = 0; row < 20; row++) {
  const currentRow = [];
  for (let col = 0; col < 50; col++) {
    currentRow.push(createNode(col, row));
  }
  grid.push(currentRow);
}
return grid;
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === start_node_r && col === start_node_c,
    isFinish: row === fin_node_r && col === fin_node_c,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    parentNode: null,
  };
};


const getNewGridwithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

