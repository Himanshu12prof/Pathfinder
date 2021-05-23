import React,{Component} from 'react';
import './Node.css';

export default class Node extends Component{
     constructor(props){
         super(props);
         this.state={};
     }
     render(){

        const { col,
            isFin,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;
        const extraclassName=isFin ?'node-finish': isStart? 'node-start': isWall ? 'node-wall' : '';
        
        
        
        return (
        <div 
        id={`node-${row}-${col}`}
        className={`node ${extraclassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={(row,col) => onMouseUp(row, col)}></div>
        );
         
     }
}

