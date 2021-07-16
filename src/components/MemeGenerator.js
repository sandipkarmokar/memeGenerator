import React from 'react';

import './memeGenerator.css';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then((response) => response.json())
            .then((response) => {
                const { memes } = response.data;
                this.setState({ allMemeImgs: memes });
            });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const randNum = Math.floor(
            Math.random() * this.state.allMemeImgs.length
        );
        const randMemeImg = this.state.allMemeImgs[randNum].url;
        this.setState({ randomImg: randMemeImg });
    }

    render() {
        return (
            <div className="app_ui">
                <form className="form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="TOP TEXT"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="BOTTOM TEXT"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>GENERATE</button>
                </form>
                <div className="meme_ui">
                    <img src={this.state.randomImg} alt="" />
                    <p className="topText">{this.state.topText}</p>
                    <p className="bottomText">{this.state.bottomText}</p>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;
