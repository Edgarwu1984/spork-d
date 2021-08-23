import React from 'react';
import Modal from '.';
import styled from 'styled-components';

const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 1024px;
  overflow-y: auto;

  img {
    margin-bottom: 1rem;
  }
`;

function MenuModal({ show, onClick, onClose, data }) {
  return (
    <Modal show={show} onClick={onClick} onClose={onClose} title='Menu'>
      <MenuWrap>
        {data ? (
          data.map((img, index) => <img key={index} src={img} alt={img} />)
        ) : (
          <div>No Menu.</div>
        )}
      </MenuWrap>
    </Modal>
  );
}

export default MenuModal;
