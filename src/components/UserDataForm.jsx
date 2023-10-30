import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { setListData } from "../store/dataSlice";

function UserDataForm() {
  // const dispatch = useDispatch();
  // const submitedList = useSelector((state) => state?.listData?.submitedList);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: null,
    address: null,
    remarks: "",
    reference: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    remarks: Yup.string().required(),
    reference: Yup.string().required(),
  });
  const [initialValuesForm, setInitialValuesForm] = useState(initialValues);
  const [multipleList, setMultipleList] = useState({
    phone: [],
    address: [],
  });
  const [submitedListState, setSubmitedListState] = useState([]);
  const [tab, setTab] = useState(0);

  const handleDelete = (index, listName) => {
    setMultipleList({
      ...multipleList,
      [listName]: multipleList[listName].filter((data, i) => i !== index),
    });
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValuesForm}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          if (
            multipleList.phone?.length > 0 &&
            multipleList.address?.length > 0
          ) {
            setSubmitedListState([
              ...structuredClone(submitedListState),
              {
                ...data,
                phone: multipleList.phone,
                address: multipleList.address,
              },
            ]);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="input-field">
                <label>First Name</label>
                <input
                  type="text"
                  value={values.firstName}
                  name="firstName"
                  onChange={(e) => handleChange("firstName")(e.target.value)}
                />
                <p>
                  <ErrorMessage name="firstName" />
                </p>
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input
                  type="text"
                  value={values.lastName}
                  name="lastName"
                  onChange={(e) => handleChange("lastName")(e.target.value)}
                />
                <p>
                  <ErrorMessage name="lastName" />
                </p>
              </div>
              <div className="input-field">
                <label>Phone No</label>
                <input
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={(e) => {
                    handleChange("phone")(e.target.value);
                  }}
                />
                <button
                  className="plus-button"
                  type="button"
                  onClick={() => {
                    if (values?.phone && multipleList?.phone?.length < 4) {
                      setMultipleList({
                        ...multipleList,
                        phone: [
                          ...multipleList.phone,
                          { number: values.phone },
                        ],
                      });
                      setFieldValue("phone", 0);
                      setInitialValuesForm({
                        ...initialValuesForm,
                        phone: null,
                      });
                    }
                  }}
                >
                  <Icon icon="material-symbols:add" />
                </button>
                <p>
                  <ErrorMessage name="phone" />
                </p>
              </div>
              <ul>
                {multipleList?.phone?.map((item, i) => {
                  return (
                    <li key={`number-${i}`}>
                      {item?.number}{" "}
                      <button
                        className="minus-button"
                        type="button"
                        onClick={() => handleDelete(i, "phone")}
                      >
                        <Icon icon="ic:baseline-minus" />
                      </button>{" "}
                    </li>
                  );
                })}
              </ul>
              <div className="input-field">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={(e) => {
                    handleChange("address")(e.target.value);
                  }}
                />
                <button
                  className="plus-button"
                  type="button"
                  onClick={() => {
                    if (values?.address && multipleList?.address?.length < 4) {
                      setMultipleList({
                        ...multipleList,
                        address: [
                          ...multipleList.address,
                          { address: values.address },
                        ],
                      });
                      setFieldValue("address", null);
                      setInitialValuesForm({
                        ...initialValuesForm,
                        address: null,
                      });
                    }
                  }}
                >
                  <Icon icon="material-symbols:add" />
                </button>
                <p>
                  <ErrorMessage name="address" />
                </p>
              </div>
              <ul>
                {multipleList?.address?.map((item, i) => {
                  return (
                    <li key={`address-${i}`}>
                      {item?.address}{" "}
                      <button
                        className="minus-button"
                        type="button"
                        onClick={() => handleDelete(i, "address")}
                      >
                        <Icon icon="ic:baseline-minus" />
                      </button>{" "}
                    </li>
                  );
                })}
              </ul>
              <div className="input-field">
                <label>Remarks</label>
                <input
                  type="text"
                  value={values.remarks}
                  name="remarks"
                  onChange={(e) => handleChange("remarks")(e.target.value)}
                />
                <p>
                  <ErrorMessage name="remarks" />
                </p>
              </div>
              <div className="input-field">
                <label>Reference</label>
                <input
                  type="text"
                  value={values.reference}
                  name="reference"
                  onChange={(e) => handleChange("reference")(e.target.value)}
                />
                <p>
                  <ErrorMessage name="reference" />
                </p>
              </div>
              <button type="submit" className="submit">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>

      <ul className="nav nav-tabs">
        <li className="nav-item" onClick={() => setTab(0)}>
          <a
            className={`nav-link ${tab == 0 ? "active" : ""}`}
            aria-current="page"
          >
            Domestic
          </a>
        </li>
        <li className="nav-item" onClick={() => setTab(1)}>
          <a className={`nav-link ${tab == 1 ? "active" : ""}`}>
            International
          </a>
        </li>
        <li className="nav-item" onClick={() => setTab(2)}>
          <a className={`nav-link ${tab == 2 ? "active" : ""}`}>All</a>
        </li>
      </ul>

      <table className="table">
        <thead className="table-head">
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone No</th>
          <th>Address</th>
          <th>Remark</th>
          <th>Reference</th>
        </thead>
        <tbody className="table-body">
          {submitedListState?.map((item, i) => {
            return (
              <tr key={`table-${i}`}>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td>
                <td>
                  <ul>
                    {item?.phone?.map((phoneItem, index) => {
                      return (
                        <li key={`phineke-${index}`}>{phoneItem?.number}</li>
                      );
                    })}
                  </ul>
                </td>
                <td>
                  <ul>
                    {item?.address?.map((addressItem, index) => {
                      return (
                        <li key={`address-${index}`}>{addressItem?.number}</li>
                      );
                    })}
                  </ul>
                </td>
                <td>{item?.remarks}</td>
                <td>{item?.reference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default UserDataForm;
