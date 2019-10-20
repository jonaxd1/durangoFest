
	// clearState() {
	// 	const { navigation } = this.props;
	// 	const clear = navigation.getParam('clear', false);
	// 	if (clear) {
	// 		this.setState({
	// 			order: [],
	// 			totalItems: 0,
	// 			totalPrice: 0,
	// 		},() => {
	// 			this.loadProducts('Pizzas');
	// 		})
	// 	}
	// }

	// gotoMyOrder() {
	// 	const { navigation } = this.props;
	// 	const { order, totalPrice } = this.state;
	// 	navigation.navigate('Orden', {order: order, total: totalPrice });
	// }

	// function addToOrder(item) {
	// 	const { order, totalItems, totalPrice } = this.state;
	// 	let total = totalPrice;
	// 	let items = totalItems;
	// 	const newItem = {...item};
	// 	newItem.quantity = 1;
	// 	newItem.totalPrice = item.price;
		
	// 	let handleOrder = [...order || []];

	// 	if (item.isAdded) {
	// 		const index = handleOrder.findIndex(function(element) {
	// 			return element.idProduct === newItem.idProduct;
	// 		});

	// 		total -= handleOrder[index].totalPrice;
	// 		items -= handleOrder[index].quantity;

	// 		handleOrder.splice(index, 1);
	// 		item.isAdded = false;

	// 		this.setState({ order: handleOrder, totalItems: items, totalPrice: total });
	// 	} else {
	// 		if (totalItems < 5) {
	// 			item.isAdded = true;
	// 			const index = handleOrder.findIndex(function(element) {
	// 				return element.idProduct === newItem.idProduct;
	// 			});
	// 			if (index >= 0) {
	// 				handleOrder[index].quantity += 1;
	// 				handleOrder[index].totalPrice = handleOrder[index].price * handleOrder[index].quantity;
	// 			} else {
	// 				handleOrder.push(newItem);
	// 			}

	// 			total += newItem.totalPrice;
	// 			items += newItem.quantity;

	// 			this.setState({ order: handleOrder, totalItems: items, totalPrice: total });
	// 		} else {
	// 			Toast.show('No puedes agregar más de 10 items', Toast.SHORT);
	// 		}
	// 	}
	// }

	// loadCategories() {
	// 	api.categories.getAll()
	// 		.then((data) => {
	// 			this.setState({categories: data});
	// 		})
	// 		.catch((err) => {
	// 			Toast.show('Oops! Ocurrio un error.\nIntenta de nuevo.', Toast.LONG);
	// 		})
	// }

	// loadProducts(category) {
	// 	api.products.byCategory(category)
	// 		.then((data) => {
	// 			this.setState({products: data});
	// 		})
	// 		.catch((err) => {
	// 			Toast.show(err, Toast.LONG);
	// 		});
	// }
