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

    render(){
        return(
            <div className="foto-info">
                <div className="foto-info-likes">
                {
                    this.props.foto.likers.map(liker=>{
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
                    this.props.foto.comentarios.map(comentario=>{
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

    like(event){
        event.preventDefault();
        this.props.like(this.props.foto.id);
    }

    comenta(event){
        event.preventDefault();
        this.props.comenta(this.props.foto.id, this.comentario.value);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} href="#" className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
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
                {/* Passing the properties in the usual way, one by way */}
                {/* <FotoAtualizacoes foto={this.props.foto} like={this.props.like} comenta={this.props.comenta}></FotoAtualizacoes> */}
                {/* Passing the properties using Spread Operator ES6 feature */}
                <FotoAtualizacoes {...this.props}></FotoAtualizacoes>
            </div>
        );
    }
}