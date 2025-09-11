

import { Input, Select } from "antd"
import CreateCaption from "../../../components/CreateCaption"
import { useEffect, useState, type FormEvent } from "react"
import type { StackType } from "../../../@types/StackType"
import type { RegionType } from "../../../@types/RegionType"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import instance from "../../../hooks/instance"

const TeacherCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>("")
  const [surname, setSurName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [stackId, setStackId] = useState<string>()
  const [regionId, setRegionId] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [statusId, setStatusId] = useState<string>()
  const [experience, setExperience] = useState<string>()
  const [gender, setGender] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [study, setStudy] = useState<string>()
  const [isMerried, setIsMerried] = useState<string>()
  const [workCompanyIds, setWorkCompanyIds] = useState<string>()

  // stack get all
  const [stacks, setStacks] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])
  // stack get all 

  // Region get all
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
  // region get all 

  // Work list get all
  const [workList, setWorkList] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/work-lists").then(res => {
      setWorkList(res.data.data.map((item: RegionType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])
  // Work list get all 

    // Status get all
  const [status, setStatus] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/status").then(res => {
      setStatus(res.data.data.map((item: RegionType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])
  // status get all


  function handleCreateTeacher(e: FormEvent<HTMLFormElement>) {
    setLoading(true)
    e.preventDefault()
    const data = {
      name,
      surname,
      age: Number(age),
      stackId: Number(stackId), 
      regionId: Number(regionId),
      district,
      statusId: Number(statusId),
      experience,
      gender,
      email,
      phone,
      isMerried,
      study,
      workCompanyIds: [Number(workCompanyIds)]
    }
    instance().post("/teachers", data).then((res) => {
      console.log(res);
      
      toast.success("Muvoffaqiyatli qo'shildi", {
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
    <form autoComplete="off" onSubmit={handleCreateTeacher} className="p-5 h-[calc(100vh-60px)] overflow-y-auto">
      <CreateCaption isLoading={loading} title="Ustoz " />
      <div className="flex mt-5 justify-between">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={name} onChange={(e) => setName(e.target.value)} allowClear placeholder="Ism kiriting" size="large" />
          <Input value={surname} onChange={(e) => setSurName(e.target.value)} allowClear placeholder="Familiya kiriting" size="large" />
          <Input value={age} onChange={(e) => setAge(e.target.value)} allowClear placeholder="Yosh kiriting" size="large" />
          <Select value={stackId} onChange={e => setStackId(e)} className="!w-full" size="large" showSearch placeholder="Yo'nalish tanlang" optionFilterProp="label" allowClear options={stacks} />
          <Select value={regionId} onChange={e => setRegionId(e)} className="!w-full" size="large" showSearch placeholder="Viloyat tanlang" optionFilterProp="label" allowClear options={regions} />
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} allowClear placeholder="Tuman kiriting" size="large" />
          <Select value={statusId} onChange={e => setStatusId(e)} className="!w-full" size="large" showSearch placeholder="Lavozim tanlang" optionFilterProp="label" allowClear options={status} />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={experience} onChange={(e) => setExperience(e.target.value)} allowClear placeholder="Tajriba kiriting" size="large" />
          <Select value={gender} onChange={e => setGender(e)} className="!w-full" size="large" showSearch placeholder="Gender tanlang" optionFilterProp="label" allowClear
            options={[
              { label: "Erkak", value: "Erkak" },
              { label: "Ayol", value: "Ayol" }
            ]} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} allowClear placeholder="Email kiriting" size="large" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} allowClear placeholder="Tel raqam kiriting" size="large" />
          <Input value={study} onChange={(e) => setStudy(e.target.value)} allowClear placeholder="O'qish joyingizni kiriting" size="large" />
          <Select value={isMerried} onChange={e => setIsMerried(e)} className="!w-full" size="large" showSearch placeholder="Turmush qurganmisiz" optionFilterProp="label" allowClear
            options={[
              { label: "Ha", value: "Ha" },
              { label: "Yuq", value: "Yuq" }
            ]} />
          <Select value={workCompanyIds} onChange={e => setWorkCompanyIds(e)} className="!w-full" size="large" showSearch placeholder="Ish joyini tanlang" optionFilterProp="label" allowClear options={workList} />
        </div>
      </div>
    </form>
  )
}

export default TeacherCreate
