export interface TodoColorConstant{
  name:string;
  hex:string;
  count:number;
}

const TODOCOLORS:TodoColorConstant[]= [
  { name: 'RED', hex: '#ffafb0', count: 0 },
  { name: 'ORANGE', hex: '#ffc282', count: 0 },
  { name: 'YELLOW', hex: '#fcffb0', count: 0 },
  { name: 'GREEN', hex: '#e2ffaf', count: 0 },
  { name: 'BLUE', hex: '#aee4ff', count: 0 },
  { name: 'PURPLE', hex: '#b5c7ed', count: 0 },
];

export default TODOCOLORS;
