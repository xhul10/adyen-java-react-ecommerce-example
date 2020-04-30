import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './shopping-cart.reducer';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShoppingCartProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ShoppingCart = (props: IShoppingCartProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { shoppingCartList, match, loading } = props;
  return (
    <div>
      <h2 id="shopping-cart-heading">
        Shopping Carts
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Shopping Cart
        </Link>
      </h2>
      <div className="table-responsive">
        {shoppingCartList && shoppingCartList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Placed Date</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Payment Method</th>
                <th>Customer Details</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shoppingCartList.map((shoppingCart, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${shoppingCart.id}`} color="link" size="sm">
                      {shoppingCart.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={shoppingCart.placedDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{shoppingCart.status}</td>
                  <td>{shoppingCart.totalPrice}</td>
                  <td>{shoppingCart.paymentMethod}</td>
                  <td>
                    {shoppingCart.customerDetails ? (
                      <Link to={`customer-details/${shoppingCart.customerDetails.id}`}>{shoppingCart.customerDetails.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${shoppingCart.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${shoppingCart.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${shoppingCart.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Shopping Carts found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ shoppingCart }: IRootState) => ({
  shoppingCartList: shoppingCart.entities,
  loading: shoppingCart.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
