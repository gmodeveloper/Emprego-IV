import React from 'react'
import { connect } from 'react-redux';
import { updateCandidatura } from '../actions/candidatar';
import { storage } from '../firebase/firebaseConfig';

class TabelaLinha extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render:"",
        }
    }
    
    submter = (event) =>{
        event.preventDefault()
        let candidatura = {
        vaga: this.props.vaga,
        curriculo: this.props.curriculo,
        estado: true,
        }
        this.props.updateCandidatura(this.props.candidatura.id, candidatura)
    }
    
    componentDidMount(){
        var foto = storage.ref().child('candidato/'+ this.props.foto).getDownloadURL();
        foto.then((result)=>{
            this.setState({
                render: result,
            })
        })
    }

    render() {
        return (
                <tr>
                    <td className="align-middle">
                        <img src={this.state.render} width="10%" className="m-2 mr-4 rounded-circle" alt="foto do candidato"/>
                        {this.props.nome}
                    </td>
                    <td className="align-middle">
                        {this.props.habilidades}
                    </td>
                    <td className="align-middle">
                        <button type="button" className="btn m-0 p-0 azulEscuro t-underline" data-toggle="modal" data-target={"#"+this.props.chave} data-dismiss="modal"> Ver currículo</button>
                    </td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-primary" onClick={this.submter}>Chamar para entrevista</button>
                    </td>
                </tr >
        )
    }
}

const mapearDispatchParaProps = (dispatch) => {
    return {
        updateCandidatura: (id, candidatura) => {
            dispatch(updateCandidatura(id, candidatura));
        },
    }
}

export default connect(null, mapearDispatchParaProps)(TabelaLinha)
