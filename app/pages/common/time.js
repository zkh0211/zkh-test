import React, {Component} from 'react'

export default class CountDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            mm: '00',
            ss: '30',
            timer: null
        }
    }
    componentDidMount(){
        this.state.timer = setInterval(this.timeFn,1000)
    }
    componentWillUnmount(){
        clearInterval(this.state.timer)
    }

    changePage(){
        this.props.endtime()
        
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.minutes !== this.props.minutes){
            this.setState({
                mm: nextProps.minutes,
                ss: nextProps.seconds,
                originalMM: nextProps.minutes,
                originalSS: nextProps.seconds,
            },()=>{
                
            })
        }
        return true
    }

    timeFn = ()=>{
        if(this.state.ss === '00'){
            let newmm = (parseInt(this.state.mm) - 1).toString();
            if(this.state.mm === '00'){
                this.setState({
                    ss: this.state.originalSS,
                    mm: this.state.originalMM
                },()=>{
                    this.changePage();
                })
            }else{
                if(parseInt(newmm) > 9){
                    this.setState({
                        mm : newmm,
                        ss: '59',
                    })
                }else{
                    this.setState({
                        mm : '0' + newmm,
                        ss: '59',
                    })
                }
            }
        }else{
            let newss = (parseInt(this.state.ss) - 1).toString();
            if(parseInt(newss) > 9){
                this.setState({
                    ss : newss
                })
            }else{
                this.setState({
                    ss : '0' + newss
                })
            }
        }
       
    }

    render(){
        return(
            <div style={{color: '#0099FF', fontSize: '1.25rem', "display": 'inline-block'}}>
                 {this.state.mm} : {this.state.ss}
            </div>
        )
    }
}


