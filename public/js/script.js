const sub = document.querySelector('#form');
const taskInput = document.querySelector('#task-text');

sub.addEventListener('click', (e) => {
	// if (!taskInput.value) {
	// 	e.preventDefault();
	// 	return;
	// }
})

const handleDelete = async (id) => {
	const res = await fetch(`/api/tasks/${id}`, {
		"Content-Type": "application/json",
		method: "DELETE",
	});
	location.reload();
};

const handleUpdate = async (id) => {
	const changeField = document.querySelector(`#task-${id}`);

	await fetch(`/api/tasks/${id}`).then(res => {
		if (!res.ok) {
			throw Error('could not fetch data for that rosource');
		}
		const task = res.json()
		return task;
	})
		.then(task => {
			changeField.innerHTML = `
			    <div class="">
			        <input type='text' class="update-task form-control mb-2" value="${task.task}"/>
		            <input type='text' class="update-descr form-control" value="${task.description}"/>
		        </div>

				<div class="">
						<button class="btn btn-success btn-save" data-id="{{this.id}}">save changes</button>
				</div>
				`
		}).then(() => {
			document.querySelector('.btn-save').addEventListener('click', async () => {
				const body = {
					task: document.querySelector('.update-task').value,
					description: document.querySelector('.update-descr').value,
				}

				await fetch(`/api/tasks/${id}`,
					{
						method: "PUT",
						method: "PUT",
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),

					})
				location.reload();
			})
		})

};

const delteBtns = document.querySelectorAll(".btn-delete");
delteBtns.forEach((btn) => btn.addEventListener("click", () => handleDelete(btn.dataset.id)));

const updateBtns = document.querySelectorAll(".btn-update");
updateBtns.forEach((btn) => btn.addEventListener("click", () => handleUpdate(btn.dataset.id)));
