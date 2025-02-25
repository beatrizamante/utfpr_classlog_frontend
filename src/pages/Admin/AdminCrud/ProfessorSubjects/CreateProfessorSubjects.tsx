  import React, { useEffect, useState } from "react";
  import Input from "../../../../components/Forms/Item/Input";
  import Card from "../../../../components/Forms/Card";
  import Button from "../../../../components/Button";
  import Footer from "../../../../components/Footer";
  import background from "../../../../assets/images/background.png";
  import Header from "../../../../components/Header";
  import { useNavigate } from "react-router";
  import { classroomsApi } from "../../../../api/admin/apiClassroom";
  import { blocksApi } from "../../../../api/admin/apiBlock";
  import {Block, Subjects} from "../../../../interfaces/AdmInterfaces";
  import {subjectsApi} from "../../../../api/admin/apiSubject";
  import api from "../../../../services/api";

  type formDataInput = {
    subject_id: number;
    user_id: number;
  };

  interface User{
    id: number,
    name: string
  }
  export default function CreateProfessorSubjects() {
    const [formData, setFormData] = useState<formDataInput>({
      subject_id: 0,
      user_id: 0,
    });
    const [subjecsts, setSubjects] = useState<Subjects[]>([]);
    const [users, setUsers] = useState<User[]>([]);


    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "block_id" ? Number(value) : value,
      }));
    };

    const handleListSubjects = async () => {
      try {
        const response = await subjectsApi.getSubjects();
        console.log(response.data);
        setSubjects(response.data);
        console.log("Success! List formed!");
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };


    const handleListUsers = async () => {
      try {
        const response = await api.get("/users/professors");

        setUsers(response.data.data);
        console.log("Success! List formed!");
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };

    useEffect(() => {
      handleListSubjects();
      handleListUsers()
    }, []);

    const handleSave = async () => {
      try {
        if (formData.subject_id && formData.user_id) {
          const userSubject = {
            subject_id: formData.subject_id,
            user_id: Number(formData.user_id),
          };
          console.log(userSubject);

          const response = await api.post("/user-subjects", userSubject);
          console.log(response);
          setFormData({
            user_id: 0,
            subject_id: 0,
          });
        } else {
          console.error("All fields must be filled.");
        }
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    };

    const onCancel = () => {
      setFormData({
        subject_id: 0,
        user_id: 0,
      });
      navigate(-1);
    };

    return (
      <div
        className="min-h-screen flex flex-col bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          mixBlendMode: "soft-light",
        }}
      >
        <div className="absolute inset-0 opacity-40 z-0"></div>
        <Header />
        <div className="flex justify-center pb-8 relative flex-grow pt-12">
          <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
            <Card title="Matéria/Professor" size="2xl">
              <div className="flex flex-col space-y-6">
                <div>
                  <select
                      name="subject_id"
                      value={formData.subject_id}
                      onChange={handleSelectChange}
                      className="text-utfpr_white mt-1 block w-full py-2 px-3 border-utfpr_yellow bg-utfpr_dark_gray rounded-md shadow-sm focus:outline-none focus:ring-1 focus:bg-utpr_dark_gray focus:border-utfpr_yellow "
                  >
                    <option value={0}>Selecione a matéria</option>
                    {subjecsts.map((subject) => (
                        <option key={subject.id} value={String(subject.id)}>
                          {subject.name}
                        </option>
                    ))}
                  </select>
                  <select
                      name="user_id"
                      value={formData.user_id}
                      onChange={handleSelectChange}
                      className="text-utfpr_white mt-1 block w-full py-2 px-3 border-utfpr_yellow bg-utfpr_dark_gray rounded-md shadow-sm focus:outline-none focus:ring-1 focus:bg-utpr_dark_gray focus:border-utfpr_yellow "
                  >
                    <option value={0}>Selecione o professor</option>
                    {users.map((user) => (
                        <option key={user.id} value={String(user.id)}>
                          {user.name}
                        </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 w-full pt-10">
                <Button onClick={handleSave}>SALVAR</Button>
                <Button onClick={onCancel} color="utfpr_red">
                  CANCELAR
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
