import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import instance from "../../hooks/instance"
import type { StackType } from "../../@types/StackType"
import type { RegionType } from "../../@types/RegionType"
import { CreateCaption } from "../../components"
import { Input, Select } from "antd"
import { toast } from "react-toastify"


const StudentsCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>("")
  const [surname, setSurName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [regionId, setRegionId] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [gender, setGender] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [study, setStudy] = useState<string>()
  const [status,setStatus] = useState<string>()

  
  const [regions, setRegions] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/regions").then(res => {
      setRegions(res.data.data.map((item: RegionType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])

  useEffect(() => {

    instance().get("/status").then(res => {
      setStatus(res.data.data.map((item: RegionType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])


  function handleCreateStudents(e:React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    e.preventDefault()
    const data = {
      name,
      surname,
      age: Number(age), 
      regionId: Number(regionId),
      district,
      gender,
      email,
      phone,
      study,
    }

    instance().post("/students", data).then(res => {
      console.log(res);
      toast.success("Muvaffaqiyatli qo'shildi", {
        onClose: () => {
          setLoading(false)
          navigate(-1) 
        },
        autoClose: 1000,
      })
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <form  onSubmit={handleCreateStudents} autoComplete="off" className="p-5 h-[calc(100vh-60px)] overflow-y-auto">
      <CreateCaption isLoading={loading} title="O'quvchilar" />
      <div className="flex mt-5 justify-between">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={name} onChange={(e) => setName(e.target.value)} allowClear placeholder="Ism kiriting" size="large" />
          <Input value={surname} onChange={(e) => setSurName(e.target.value)} allowClear placeholder="Familiya kiriting" size="large" />
          <Input value={age} onChange={(e) => setAge(e.target.value)} allowClear placeholder="Yosh kiriting" size="large" />
          <Select value={regionId} onChange={e => setRegionId(e)} className="!w-full" size="large" showSearch placeholder="Viloyat tanlang" optionFilterProp="label" allowClear options={regions} />
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} allowClear placeholder="Tuman kiriting" size="large" />
        </div>

        <div className="w-[45%] flex flex-col gap-5">
          <Select value={gender} onChange={e => setGender(e)} className="!w-full" size="large" showSearch placeholder="Gender tanlang" optionFilterProp="label" allowClear
            options={[
              { label: "Erkak", value: "Erkak" },
              { label: "Ayol", value: "Ayol" }]}/>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} allowClear placeholder="Email kiriting" size="large" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} allowClear placeholder="Tel raqam kiriting" size="large" />
          <Input value={study} onChange={(e) => setStudy(e.target.value)} allowClear placeholder="O'qish joyingizni kiriting" size="large" />
        </div>
      </div>
    </form>
  )
}

export default StudentsCreate














