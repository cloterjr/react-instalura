import React, {Component} from 'react';
import PubSub from 'pubsub-js';

class FotoHeader extends Component {
    render(){
        return(
            <header className="foto-header">
                <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"></img>
                <figcaption className="foto-usuario">
                    <a href="#">
                    {this.props.foto.loginUsuario}
                    </a>  
                </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {
    
    constructor(props){
        super(props);
        this.state = {likers: this.props.foto.likers, comentarios: this.props.foto.comentarios};
    }

    componentWillMount(){
        PubSub.subscribe('atualiza-liker', (topico, infoLiker)=>{
            if(this.props.foto.id === infoLiker.fotoId) {
                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);

                if(possivelLiker === undefined) {
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({likers: novosLikers});
                } else {
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({likers: novosLikers});
                }
            }
        });

        PubSub.subscribe('novos-comentarios', (topico, infoComentario)=>{
            if(this.props.foto.id === infoComentario.fotoId){
                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({comentarios: novosComentarios});
            }
        });
    }

    render(){
        return(
            <div className="foto-info">
                <div className="foto-info-likes">
                {
                    this.state.likers.map(liker=>{
                        return <a key={liker.login} href="#">{liker.login}, </a>
                    })
                }

                curtiram
            
                </div>

                <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                {
                    this.state.comentarios.map(comentario=>{
                        return(
                            <li className="comentario" key={comentario.id}>
                                <a className="foto-info-autor">{comentario.login} </a>
                                {comentario.texto}
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component {

    constructor(){
        super();
        this.state = {likeada:false};
    }

    like(){
        window.event.preventDefault();
        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, {method: 'POST'})
            .then((response)=>{
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("não foi possível realizar o like da foto");
                }
            })
            .then(liker=>{
                this.setState({likeada : !this.state.likeada});
                PubSub.publish('atualiza-liker', {fotoId: this.props.foto.id, liker});
            });
    }

    comenta(){
        window.event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({texto: this.comentario.value}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error('não foi possível comentar');
                }
            })
            .then(novoComentario => {
                PubSub.publish('novos-comentarios', {fotoId: this.props.foto.id, novoComentario});
            });
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} href="#" className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}></input>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"></input>
                </form>
            </section>
        );
    }
}

export default class FotoItem extends Component{
    render(){
        return(
            <div className="foto">
                <FotoHeader foto={this.props.foto}></FotoHeader>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}></img>
                <FotoInfo foto={this.props.foto}></FotoInfo>
                <FotoAtualizacoes foto={this.props.foto}></FotoAtualizacoes>
            </div>
        );
    }
}