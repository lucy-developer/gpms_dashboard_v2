import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketObj } from '@models/ticket';
import { Button, Row } from 'antd';
import { getFormFields, ISelectOptions } from '@utils/form';
import { conversionDate, conversionDateTime } from '@/utils/conversion';
import { string2mobile } from '@utils/tools';
import { IDiscountClassObj } from '@models/discountClass';
import { DiscountFields } from '@views/Setting/Product/tabs/fields/discount';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { corpDiscountFields } from '@views/Setting/Product/tabs/fields/corpTicketClass';

interface ICorpTicketModalProps extends FormComponentProps {
  discount?: ICorpTicketClassObj;
  onSubmit: (discount: ICorpTicketClassObj) => void;
  discountSelectClasses: ISelectOptions[];
  discountClasses: IDiscountClassObj[];
}
interface ICorpTicketModalState {}

@inject('localeStore')
@observer
class CorpTicketModal extends PureComponent<ICorpTicketModalProps, ICorpTicketModalState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      const discountClass: IDiscountClassObj = this.props.discountClasses.filter((e) => {
        return e.sn === Number(fieldsValue.discountClassSn);
      })[0];
      fieldsValue.effectDate = conversionDateTime(discountClass.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(discountClass.expireDate, '{y}-{m}-{d} 23:59:59');
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const CorpDiscountFields = corpDiscountFields(
      this.props.discount,
      this.props.discountSelectClasses
    );
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, CorpDiscountFields, true, 8)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px', width: '20%', left: '40%' }}
            >
              등록
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const CorpTicketModalForm = Form.create<ICorpTicketModalProps>({ name: 'corpTicketModal' })(
  CorpTicketModal
);

export default CorpTicketModalForm;