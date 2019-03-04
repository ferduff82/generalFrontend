
import React from 'react';
import '../styles/BriefComponent.scss';

class BriefComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			dataOrder: []
		};
	}

	componentDidMount() { 
		const self = this;

		let isDataReceived = setInterval(function() {
			if (self.props.briefData) { 
				self.reorderList(self.props.briefData);
				clearInterval(isDataReceived);
			}
		}, 100);
	}

	reorderList(dataObject) {

		let reorderedList = ['', '', '', '', '', ''];

		Object.keys(dataObject.history.stats).map((p, index) => {
			if (index === 0) {
				reorderedList.splice(3, 1, { number: dataObject.history.stats[p], id: "N° de amarillos previos", color: "yellowBack" });
			} else if (index === 1) {
				reorderedList.splice(0, 1, { number: dataObject.history.stats[p], id: "Días desde la última atención", color: "grayBack" });
			} else if (index === 2) {
				reorderedList.splice(5, 1, { number: dataObject.history.stats[p], id: "N° de traslados", color: "grayBack" });
			} else if (index === 3) {
				reorderedList.splice(2, 1, { number: dataObject.history.stats[p], id: "N° de rojos previos", color: "redBack" });
			} else if (index === 4) {
				reorderedList.splice(1, 1, { number: dataObject.history.stats[p], id: "N° total de atenciones", color: "grayBack" });
			} else {
				reorderedList.splice(4, 1, { number: dataObject.history.stats[p], id: "N° de verdes previos", color: "greenBack" });
			}
		})

		this.setState({
			dataOrder: reorderedList
		});
	}
	
	render() {
		return (
			<div className="briefComponent container-fluid">
				<ul>
					{this.state.dataOrder.map((p, index) => 
						<li key={index}>{	  			
							<div className="row-brief d-flex">
								<div className={"left-column-brief " + this.state.dataOrder[index].color}>
									{this.state.dataOrder[index].number}
								</div>
								<div className="right-column-brief">{this.state.dataOrder[index].id}</div>
								<div className={"right-color " + this.state.dataOrder[index].color}></div>
							</div>
						}</li>
					)}
				</ul>
			</div>
		)
	}
}

export default BriefComponent;
