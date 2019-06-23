import React, {Component} from 'react';
import FotoItem from './Foto';
import PubSub from 'pubsub-js';
import CSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup';


export default class Timeline extends Component {

    constructor(){
        super();
        this.state = {fotos: []}; 
    }

    componentWillMount(){
        PubSub.subscribe('timeline', (topico, fotos)=>{
            this.setState({fotos});
        });
    }

    componentDidMount(){
        if(localStorage.getItem('auth-token') != null)
        {
            fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
            .then(response => response.json())
            .then(fotos => {
               this.setState({fotos: fotos}); 
            })
            .catch(resposta=>{
                console.log(resposta);
            });
        }
    }

    render(){
        return(
            <div className="fotos container">
                <CSSTransitionGroup
                transitionName="timeline"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {
                    this.state.fotos.map(foto=><FotoItem key={foto.id} foto={foto}/>)
                }
                </CSSTransitionGroup>
            </div>
        );
    }
}