import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pagination from '../../components/common/Pagination';
import DynamicTable from '../../components/common/DaynamicTable';
import { QuestionRecord, QuestionSchema } from './QuestionSchema';
import { useDispatch, useSelector } from 'react-redux';
import questionModule from '../../store/features/questions';
import QuestionForm, {
  QuestionFormData,
  QuestionFormProps,
} from '../../components/questions/QuestionForm';
import {
  QuestionDiv,
  QuestionSearch,
} from '../../utils/nia153/interfaces/question';
import LimitFilter from '../../components/common/LimitFilter';
import Search from '../../components/questions/Search';
import alertModal from '../../store/features/common/alertModal';
import { toFormData, toRecord } from './utils';

const filterOptions = [
  {
    name: '전체',
    value: -1,
  },
  {
    name: '답변완료',
    value: 1,
  },
  {
    name: '미답변',
    value: 0,
  },
];

const ManageQuestions = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<QuestionRecord[]>([]);
  const { edit, list, search, count } = useSelector(
    questionModule.getQuestionState,
  );
  const [formData, setFormData] = useState<QuestionFormData | null>(null);
  const [formProps, setFormProps] = useState<QuestionFormProps>({
    isReply: true,
    method: 'create',
    div: QuestionDiv.CREATE,
    show: false,
    onSubmit: () => null,
    onHide: () => null,
  });

  useEffect(() => {
    dispatch(questionModule.actions.isAdmin(true));
    dispatch(
      questionModule.actions.search({
        limit: limit,
        page: page,
      }),
    );
    dispatch(questionModule.actions.getList());
  }, [limit, page]);

  useEffect(() => {
    setRecords(recordList());
  }, [list]);

  useEffect(() => {
    if (edit != null) {
      setFormData(toFormData(edit));

      setFormProps({
        method: 'edit',
        isReply: false,
        div: edit.div,
        show: !!edit,
        onHide: onHide,
        onSubmit: onSubmit,
      });
    }

    setFormProps({
      method: !!edit?.reply ? 'edit' : 'create',
      isReply: !edit?.reply,
      div: QuestionDiv.CREATE,
      show: !!edit,
      onHide: onHide,
      onSubmit: onSubmit,
    });
  }, [edit]);

  const onHide = () => dispatch(questionModule.actions.setEdit(null));

  const onSubmit = (data: QuestionFormData) => {
    if (data.id && data.reply) {
      dispatch(
        questionModule.actions.reply({
          questionId: data.id,
          content: data.reply,
        }),
      );
    } else {
      dispatch(
        alertModal.showAlert({
          title: '답변 하기',
          message: '답변내용이 없습니다.',
        }),
      );
    }
  };

  const recordList = () => {
    return list.map(toRecord);
  };

  const onClickRecord = (r: QuestionRecord) => {
    dispatch(questionModule.actions.getById(r._origin.id));
  };

  const onSearch = (s: QuestionSearch | undefined) => {
    dispatch(questionModule.actions.getList());
  };

  return (
    <Container>
      <Row>
        <Search onSearch={onSearch} />
      </Row>
      <Row className={'mt-4'}>
        <Col lg={6}></Col>
        <Col lg={6}>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <LimitFilter
                selectedValue={limit}
                onChange={(e) => {
                  const option = e.target.options[e.target.selectedIndex];
                  setLimit(parseInt(option.value));
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <DynamicTable
          schema={QuestionSchema}
          records={records}
          onClick={onClickRecord}
        />
      </Row>
      <Row className="mt-5 align-content-center">
        <Col lg={4}></Col>
        <Pagination
          currentPage={page}
          totalCount={count}
          limit={limit}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <Col lg={4} className="mt-5"></Col>
      </Row>
      <QuestionForm {...formProps} defaultData={formData} />
    </Container>
  );
};

export default ManageQuestions;
