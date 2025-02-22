import React, { useEffect, useState } from "react";
import Card from "../../components/Forms/Card";
import Button from "../../components/Button";
import Line from "../../components/Line";
import background from "../../assets/images/background.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authentication";
import { subjectsApi } from "../../api/apiSubject";

export default function ProfessorPage() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await subjectsApi.getSubjectByProfessor(
          authApi.getRole()
        );
        if (response.data) {
          setSubjects(response.data);
        }
      } catch (err) {
        console.error("An error occurred while fetching the room data:", err);
      }
    };

    fetchSubject();
  }, [subjects]);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>

      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Card title={"Visão de Professor"} color="utfpr_white" size="2xl">
            {subjects.map((subject, index) => (
              <div key={index} className="w-full flex flex-col items-center">
                <Button
                  onClick={() =>
                    //callmodal
                  }
                  height={"80px"}
                >
                  {subject.identification}
                </Button>
                <Line />
              </div>
            ))}
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
