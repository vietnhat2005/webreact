import React, { useState } from 'react';
import jsonData from './data.json'; // Import file JSON

const Dashboard = () => {
    const [systems, setSystems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [systemName, setSystemName] = useState('');
    const [systemId, setSystemId] = useState('');
    const [humidityThreshold, setHumidityThreshold] = useState('');
    const [newHumidityThreshold, setNewHumidityThreshold] = useState('');
    const [deviceData, setDeviceData] = useState(null); // State để lưu dữ liệu của thiết bị khi tìm thấy

    // Hàm xử lý thêm hệ thống
    const handleAddSystem = () => {
        // Tạo một đối tượng hệ thống mới
        const newSystem = {
            name: systemName,
            id: systemId,
            threshold: humidityThreshold,
            data: deviceData // Dữ liệu từ JSON
        };

        // Cập nhật state systems với hệ thống mới
        setSystems([...systems, newSystem]);

        // Đặt lại form và ẩn nó
        setSystemName('');
        setSystemId('');
        setHumidityThreshold('');
        setShowForm(false);
        setDeviceData(null); // Đặt lại dữ liệu thiết bị
    };

    // Hàm hiển thị form thêm hệ thống
    const handleShowForm = () => {
        setShowForm(true);
    };

    // Hàm xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'systemName':
                setSystemName(value);
                break;
            case 'systemId':
                setSystemId(value);
                break;
            case 'humidityThreshold':
                setHumidityThreshold(value);
                break;
            default:
                break;
        }
    };

    // Hàm tìm thiết bị dựa trên ID và lấy dữ liệu từ JSON
    const handleFindDevice = (id) => {
        const foundDevice = jsonData.find(device => device.ID === id);
        if (foundDevice) {
            setDeviceData({
                temperature: foundDevice.Temperature,
                humidity: foundDevice.Humidity,
                waterLevel: foundDevice["Water Level"],
                soilMoisture: foundDevice["Soil Moisture"]
            });
        } else {
            setDeviceData(null);
            alert("Device not found!");
        }
    };

    // Render giao diện
    return (
        <div className="container mt-4">
            <h2 className="text-center">Dashboard</h2>
            <div className="row">
                <div className="col-12">
                    <h4>Manage Systems</h4>
                    <button className="btn btn-success mb-3" onClick={handleShowForm}>
                        Add System
                    </button>
                    {showForm && (
                        <form>
                            <div className="form-group">
                                <label htmlFor="systemName">System Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="systemName"
                                    name="systemName"
                                    value={systemName}
                                    onChange={handleInputChange}
                                    placeholder="Enter system name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="systemId">System ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="systemId"
                                    name="systemId"
                                    value={systemId}
                                    onChange={(e) => {
                                        setSystemId(e.target.value);
                                        handleFindDevice(e.target.value);
                                    }}
                                    placeholder="Enter system ID"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="humidityThreshold">Ngưỡng độ ẩm đất</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="humidityThreshold"
                                    name="humidityThreshold"
                                    value={humidityThreshold}
                                    onChange={handleInputChange}
                                    placeholder="Enter threshold"
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleAddSystem}>
                                Submit
                            </button>
                        </form>
                    )}
                    <ul className="list-group mt-3">
                        {systems.map((system, index) => (
                            <li key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="col-md-4 system-info">
                                        <h5>{system.name}</h5>
                                        <p>ID: <span className="badge badge-secondary text-white bg-primary">{system.id}</span></p>
                                        <p>Temperature: <span className="badge badge-primary text-white bg-danger">{system.data.temperature}</span></p>
                                        <p>Humidity: <span className="badge badge-secondary text-white bg-danger">{system.data.humidity}</span></p>
                                        <p>Water Level: <span className="badge badge-info text-white bg-danger">{system.data.waterLevel}</span></p>
                                        <p>Soil Moisture: <span className="badge badge-success text-white bg-danger">{system.data.soilMoisture}</span></p>
                                    </div>
                                    <div className="col-md-4 system-actions">
                                        <p><span style={{ color: 'red' }}>Ngưỡng độ ẩm đất:</span> <span className="badge badge-secondary text-white bg-danger">{system.threshold}</span></p>
                                    </div>
                                    <div className="col-md-4 system-delete">
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSystem(index)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
