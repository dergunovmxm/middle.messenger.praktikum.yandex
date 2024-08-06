import { expect } from 'chai';
import sinon from 'sinon';

import { Block } from '../block';

describe('Block', () => {
  let block: Block<object>;

  beforeEach(() => {
    block = new Block();
  });

  it('should dispatch componentDidMount event', () => {
    const emitSpy = sinon.spy(block.eventBus(), 'emit');
    block.dispatchComponentDidMount();
    expect(emitSpy.calledOnceWithExactly(Block.EVENTS.FLOW_CDM)).to.be.true;
    emitSpy.restore();
  });

  it('should show the element', () => {
    const el = document.createElement('div');
    const getContentStub = sinon.stub(block, 'getContent').returns(el);
    block.show();
    expect(el.style.display).to.equal('block');
    getContentStub.restore();
  });

  it('should hide the element', () => {
    const el = document.createElement('div');
    const getContentStub = sinon.stub(block, 'getContent').returns(el);
    block.hide();
    expect(el.style.display).to.equal('none');
    getContentStub.restore();
  });
});
