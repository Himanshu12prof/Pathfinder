import Constants from "../utils/constants";
import React, { Fragment, useState } from "react";
export default class GridFactory {
  


  static getInitialGrid = (startNode, finishNode) => {
    const grid = [];
    for (let row = 0; row < Constants.ROWS_NUMBER; row++) {
      const currentRow = [];
      for (let col = 0; col < Constants.COLUMNS_NUMBER; col++) {
        currentRow.push(this.createNode(col, row, startNode, finishNode));
      }
      grid.push(currentRow);
    }
    //grid=clearGrid(grid,startNode,finishNode);
    return grid;
  };

  static clearGrid = (startNode, finishNode) => {
    
    const grid = [];
    
    for (let row = 0; row < Constants.ROWS_NUMBER; row++) {
      const currentRow = [];
      for (let col = 0; col < Constants.COLUMNS_NUMBER; col++) {
        currentRow.push(this.createNode(col, row, startNode, finishNode));
        if (col === startNode.col && row === startNode.row) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
        } else if (col === finishNode.col && row === finishNode.row) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
      grid.push(currentRow);
    }
    return grid;
  };

  



  static getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
      
    const newNode = {
      ...node,
      isWall: 1,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  static getNewGridWithStarNode = (grid, row, col, leaveTheNode) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !leaveTheNode,
      isWall: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  static getNewGridWithFinishNode = (grid, row, col, leaveTheNode) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: !leaveTheNode,
      isWall: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  static createNode = (col, row, startNode, finishNode) => {
    return {
      col,
      row,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === finishNode.row && col === finishNode.col,
      distance: Infinity,  //manhattanDistance of final and current node
      isVisited: false,
      isWall: false,
      previousNode: null,
      distanceToFinishNode:Math.abs(finishNode.row - row)+ Math.abs(finishNode.col - col),
    };
  };
}